// utils/kmeansCalculator.ts
import * as tf from '@tensorflow/tfjs';
import { FoodData, ScaledFoodData, Centroids, ClusterStats } from '../types';

export class KMeansCalculator {
    private features: (keyof FoodData)[] = [
        'KALORI', 'PROTEIN', 'LEMAK', 'KARBOHIDRAT',
        'NATRIUM', 'KALIUM', 'KALSIUM', 'MAGNESIUM'
    ];

    private customCentroids: Centroids = {
        PAGI: [200.16, 5.02, 4.61, 36.54, 24.86, 323.88, 46.47, 28.28],
        SIANG: [103.94, 5.32, 4.63, 12.03, 15.65, 260.27, 51.72, 32.82],
        MALAM: [185.39, 2.69, 2.67, 40.99, 22.05, 481.22, 70.34, 31.08]
    };

    // Enum untuk tipe inisialisasi centroid
    public static readonly CentroidInitialization = {
        CUSTOM: 'custom',
        RANDOM: 'random',
        KMEANS_PLUS_PLUS: 'kmeans++'
    } as const;

    // Scale data menggunakan Z-score normalization
    private scaleData(data: FoodData[]): { scaledData: ScaledFoodData[], means: number[], stdDevs: number[] } {
        return tf.tidy(() => {
            const values = data.map(item => this.features.map(feature => item[feature]));
            const tensor = tf.tensor2d(values);

            const means = tensor.mean(0).dataSync();
            const variances = tensor.sub(tensor.mean(0)).square().mean(0);
            const stdDevs = variances.sqrt().dataSync();

            // Handle zero standard deviation
            const safeStdDevs = stdDevs.map(dev => dev === 0 ? 1 : dev);

            const scaledTensor = tensor.sub(means).div(safeStdDevs);
            const scaledValues = scaledTensor.arraySync() as number[][];

            const scaledData: ScaledFoodData[] = data.map((item, index) => ({
                ...item,
                scaledValues: scaledValues[index]
            }));

            return {
                scaledData,
                means: Array.from(means),
                stdDevs: Array.from(safeStdDevs)
            };
        });
    }

    // Scale centroid custom
    private scaleCustomCentroids(means: number[], stdDevs: number[]): number[][] {
        return tf.tidy(() => {
            const centroidsArray = Object.values(this.customCentroids);
            const centroidsTensor = tf.tensor2d(centroidsArray);
            const meansTensor = tf.tensor1d(means);
            const stdDevsTensor = tf.tensor1d(stdDevs);

            const scaledCentroidsTensor = centroidsTensor.sub(meansTensor).div(stdDevsTensor);
            return scaledCentroidsTensor.arraySync() as number[][];
        });
    }

    // Inisialisasi centroid secara acak dari data
    private initializeRandomCentroids(points: tf.Tensor2D, k: number): tf.Tensor2D {
        return tf.tidy(() => {
            const indices: number[] = [];
            const numPoints = points.shape[0];

            // Pilih k indeks acak yang unik
            while (indices.length < k) {
                const randomIndex = Math.floor(Math.random() * numPoints);
                if (!indices.includes(randomIndex)) {
                    indices.push(randomIndex);
                }
            }

            return points.gather(tf.tensor1d(indices, 'int32'));
        });
    }

    // Inisialisasi centroid menggunakan algoritma K-Means++
    private initializeKMeansPlusPlus(points: tf.Tensor2D, k: number): tf.Tensor2D {
        return tf.tidy(() => {
            const numPoints = points.shape[0];
            const centroids: tf.Tensor2D[] = [];

            // Pilih centroid pertama secara acak
            const firstIndex = Math.floor(Math.random() * numPoints);
            centroids.push(points.gather([firstIndex]));

            // Pilih centroid selanjutnya berdasarkan probabilitas
            for (let i = 1; i < k; i++) {
                // Hitung jarak kuadrat dari setiap titik ke centroid terdekat
                const distances = this.calculateAllDistances(
                    tf.concat(centroids, 0) as tf.Tensor2D,
                    points
                );

                const minDistances = distances.min(1).square() as tf.Tensor1D;
                const totalDistance = minDistances.sum().dataSync()[0];

                // Pilih titik berikutnya dengan probabilitas proporsional terhadap jarak kuadrat
                const probabilities = minDistances.div(totalDistance).dataSync();

                let cumulativeProb = 0;
                const randomValue = Math.random();
                let selectedIndex = 0;

                for (let j = 0; j < numPoints; j++) {
                    cumulativeProb += probabilities[j];
                    if (cumulativeProb >= randomValue) {
                        selectedIndex = j;
                        break;
                    }
                }

                centroids.push(points.gather([selectedIndex]));
            }

            return tf.concat(centroids, 0) as tf.Tensor2D;
        });
    }

    // Hitung jarak Euclidean antara centroid dan semua points
    private calculateAllDistances(centroids: tf.Tensor2D, points: tf.Tensor2D): tf.Tensor2D {
        return tf.tidy(() => {
            // points shape: [numPoints, numFeatures]
            // centroids shape: [numCentroids, numFeatures]

            // Expand dimensions untuk broadcasting
            const expandedPoints = points.expandDims(1);
            const expandedCentroids = centroids.expandDims(0);

            // Hitung squared differences: [numPoints, numCentroids, numFeatures]
            const differences = expandedPoints.sub(expandedCentroids);
            const squaredDifferences = differences.square();

            // Sum along the features axis (axis 2): [numPoints, numCentroids]
            const sumSquaredDifferences = squaredDifferences.sum(2);

            // Take square root: [numPoints, numCentroids]
            const distances = sumSquaredDifferences.sqrt();

            return distances;
        });
    }

    // Algoritma K-Means utama yang dapat menggunakan berbagai metode inisialisasi
    public performKMeans(
        data: FoodData[],
        maxIterations: number = 100,
        initializationMethod: keyof typeof KMeansCalculator.CentroidInitialization = 'CUSTOM'
    ): ScaledFoodData[] {
        if (data.length === 0) return [];

        // Scale data
        const { scaledData, means, stdDevs } = this.scaleData(data);

        return tf.tidy(() => {
            // Convert to tensors
            const points = tf.tensor2d(scaledData.map(item => item.scaledValues));
            const k = Object.keys(this.customCentroids).length;

            let centroids: tf.Tensor2D;

            // Pilih metode inisialisasi centroid
            switch (initializationMethod) {
                case 'RANDOM':
                    centroids = this.initializeRandomCentroids(points, k);
                    break;
                case 'KMEANS_PLUS_PLUS':
                    centroids = this.initializeKMeansPlusPlus(points, k);
                    break;
                case 'CUSTOM':
                default:
                    const scaledCentroids = this.scaleCustomCentroids(means, stdDevs);
                    centroids = tf.tensor2d(scaledCentroids);
                    break;
            }

            let previousAssignments: tf.Tensor1D | null = null;
            let iterations = 0;
            let changed = true;

            while (iterations < maxIterations && changed) {
                // Hitung jarak antara semua titik dan centroid sekaligus
                const distances = this.calculateAllDistances(centroids, points);

                // Temukan centroid terdekat untuk setiap titik (along axis 1)
                const assignments = distances.argMin(1);

                // Cek konvergensi
                if (previousAssignments) {
                    const assignmentChange = assignments.notEqual(previousAssignments).sum().dataSync()[0];
                    changed = assignmentChange > 0;
                    previousAssignments.dispose();
                }

                previousAssignments = assignments.clone();

                if (changed && iterations < maxIterations - 1) {
                    // Update centroids
                    const newCentroids: tf.Tensor2D[] = [];

                    for (let i = 0; i < k; i++) {
                        // Dapatkan indices points yang termasuk dalam cluster ini
                        const clusterIndices: number[] = [];
                        const assignmentsData = assignments.dataSync() as Int32Array;

                        for (let j = 0; j < assignmentsData.length; j++) {
                            if (assignmentsData[j] === i) {
                                clusterIndices.push(j);
                            }
                        }

                        if (clusterIndices.length > 0) {
                            const indicesTensor = tf.tensor1d(clusterIndices, 'int32');
                            const clusterPoints = points.gather(indicesTensor);
                            const newCentroid = clusterPoints.mean(0, true); // keepDims = true
                            newCentroids.push(newCentroid as tf.Tensor2D);

                            indicesTensor.dispose();
                            clusterPoints.dispose();
                        } else {
                            // Jika cluster kosong, gunakan centroid lama
                            newCentroids.push(centroids.gather([i]));
                        }
                    }

                    // Gabungkan centroid baru
                    const updatedCentroids = tf.concat(newCentroids, 0);
                    centroids.dispose();
                    centroids = updatedCentroids as tf.Tensor2D;
                }

                distances.dispose();
                iterations++;
            }

            // Hitung assignments final dan distances
            const finalDistances = this.calculateAllDistances(centroids, points);
            const finalAssignments = finalDistances.argMin(1);
            const minDistances = finalDistances.min(1);

            const assignmentsData = finalAssignments.dataSync() as Int32Array;
            const distancesData = minDistances.dataSync();

            // Assign cluster results ke scaledData
            scaledData.forEach((item, index) => {
                item.clusterResult = {
                    cluster: assignmentsData[index],
                    distance: distancesData[index],
                    initializationMethod // Simpan metode inisialisasi yang digunakan
                };
            });

            // Simpan centroid akhir untuk referensi
            const finalCentroids = centroids.arraySync() as number[][];
            scaledData.forEach(item => {
                item.finalCentroids = finalCentroids;
            });

            return scaledData;
        });
    }

    // Hitung statistik cluster
    public calculateClusterStats(data: ScaledFoodData[]): ClusterStats {
        const stats: ClusterStats = {};
        const clusterNames = ['Pagi', 'Siang', 'Malam'];

        return tf.tidy(() => {
            clusterNames.forEach((name, clusterIndex) => {
                const clusterItems = data.filter(item => item.clusterResult?.cluster === clusterIndex);

                if (clusterItems.length > 0) {
                    // Buat tensor dari data cluster
                    const values = clusterItems.map(item =>
                        this.features.map(feature => item[feature])
                    );

                    const tensor = tf.tensor2d(values);
                    const averagesTensor = tensor.mean(0);
                    const averagesData = averagesTensor.dataSync();

                    const averages: Partial<FoodData> = {};
                    this.features.forEach((feature, idx) => {
                        averages[feature] = Math.round(averagesData[idx] * 100) / 100;
                    });

                    stats[name] = {
                        count: clusterItems.length,
                        averages
                    };
                } else {
                    stats[name] = {
                        count: 0,
                        averages: {}
                    };
                }
            });

            return stats;
        });
    }

    // Get cluster name mapping
    public getClusterName(clusterNumber: number): string {
        const clusterMap = ['Pagi', 'Siang', 'Malam'];
        return clusterMap[clusterNumber] || 'Unknown';
    }

    // Get custom centroids (untuk keperluan display)
    public getCustomCentroids(): Centroids {
        return this.customCentroids;
    }
}
