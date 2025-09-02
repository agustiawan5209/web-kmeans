// utils/kmeansCalculator.ts
import { FoodData, ScaledFoodData, Centroids, ClusterStats } from '../types';

export class KMeansCalculator {
  private features: (keyof FoodData)[] = [
    'KALORI', 'PROTEIN', 'LEMAK', 'KARBOHIDRAT',
    'NATRIUM', 'KALIUM', 'KALSIUM', 'MAGNESIUM'
  ];

  // Centroid awal custom berdasarkan input Anda
  private customCentroids: Centroids = {
    PAGI: [200.16, 5.02, 4.61, 36.54, 24.86, 323.88, 46.47, 28.28],
    SIANG: [103.94, 5.32, 4.63, 12.03, 15.65, 260.27, 51.72, 32.82],
    MALAM: [185.39, 2.69, 2.67, 40.99, 22.05, 481.22, 70.34, 31.08]
  };

  // Scale data menggunakan Z-score normalization
  private scaleData(data: FoodData[]): ScaledFoodData[] {
    const means = this.calculateMeans(data);
    const stdDevs = this.calculateStdDevs(data, means);

    return data.map(item => {
      const scaledValues = this.features.map((feature, index) => {
        return (item[feature] - means[index]) / stdDevs[index];
      });

      return { ...item, scaledValues };
    });
  }

  private calculateMeans(data: FoodData[]): number[] {
    const means = this.features.map(feature => {
      const sum = data.reduce((acc, item) => acc + item[feature], 0);
      return sum / data.length;
    });
    return means;
  }

  private calculateStdDevs(data: FoodData[], means: number[]): number[] {
    return this.features.map((feature, index) => {
      const variance = data.reduce((acc, item) => {
        return acc + Math.pow(item[feature] - means[index], 2);
      }, 0) / data.length;

      return Math.sqrt(variance);
    });
  }

  // Scale centroid custom
  private scaleCustomCentroids(means: number[], stdDevs: number[]): number[][] {
    return Object.values(this.customCentroids).map(centroid => {
      return centroid.map((value, index) => {
        return (value - means[index]) / stdDevs[index];
      });
    });
  }

  // Hitung jarak Euclidean
  private euclideanDistance(point1: number[], point2: number[]): number {
    return Math.sqrt(
      point1.reduce((sum, value, index) => {
        return sum + Math.pow(value - point2[index], 2);
      }, 0)
    );
  }

  // Algoritma K-Means utama
  public performKMeans(data: FoodData[], maxIterations: number = 100): ScaledFoodData[] {
    // Scale data
    const scaledData = this.scaleData(data);
    const means = this.calculateMeans(data);
    const stdDevs = this.calculateStdDevs(data, means);

    // Scale centroid custom
    const scaledCentroids = this.scaleCustomCentroids(means, stdDevs);

    let iterations = 0;
    let changed = true;

    while (iterations < maxIterations && changed) {
      changed = false;

      // Assign points to nearest centroid
      scaledData.forEach(item => {
        let minDistance = Infinity;
        let closestCluster = -1;

        scaledCentroids.forEach((centroid, clusterIndex) => {
          const distance = this.euclideanDistance(item.scaledValues, centroid);
          if (distance < minDistance) {
            minDistance = distance;
            closestCluster = clusterIndex;
          }
        });

        if (!item.clusterResult || item.clusterResult.cluster !== closestCluster) {
          changed = true;
          item.clusterResult = { cluster: closestCluster, distance: minDistance };
        }
      });

      // Update centroids jika masih ada perubahan
      if (changed) {
        const clusterSums: { [key: number]: number[] } = {};
        const clusterCounts: { [key: number]: number } = {};

        // Initialize
        scaledCentroids.forEach((_, index) => {
          clusterSums[index] = new Array(this.features.length).fill(0);
          clusterCounts[index] = 0;
        });

        // Sum values for each cluster
        scaledData.forEach(item => {
          if (item.clusterResult) {
            const cluster = item.clusterResult.cluster;
            item.scaledValues.forEach((value, index) => {
              clusterSums[cluster][index] += value;
            });
            clusterCounts[cluster]++;
          }
        });

        // Calculate new centroids
        scaledCentroids.forEach((_, clusterIndex) => {
          if (clusterCounts[clusterIndex] > 0) {
            scaledCentroids[clusterIndex] = clusterSums[clusterIndex].map(
              sum => sum / clusterCounts[clusterIndex]
            );
          }
        });
      }

      iterations++;
    }

    return scaledData;
  }

  // Hitung statistik cluster
  public calculateClusterStats(data: ScaledFoodData[]): ClusterStats {
    const stats: ClusterStats = {};
    const clusterNames = ['Pagi', 'Siang', 'Malam'];

    clusterNames.forEach((name, index) => {
      const clusterData = data.filter(item =>
        item.clusterResult?.cluster === index
      );

      if (clusterData.length > 0) {
        const averages = this.features.reduce((acc, feature) => {
          const sum = clusterData.reduce((total, item) => total + item[feature], 0);
          acc[feature] = Math.round((sum / clusterData.length) * 100) / 100;
          return acc;
        }, {} as Partial<FoodData>);

        stats[name] = {
          count: clusterData.length,
          averages
        };
      }
    });

    return stats;
  }

  // Get cluster name mapping
  public getClusterName(clusterNumber: number): string {
    const clusterMap = ['Pagi', 'Siang', 'Malam'];
    return clusterMap[clusterNumber] || 'Unknown';
  }
}
