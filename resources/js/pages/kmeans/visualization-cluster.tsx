// components/KMeansClustering.tsx
import KlusterFood from '@/components/klusterFood';
import { ClusterStats, FoodData, ResultFoodData, ScaledFoodData } from '@/types';
import { KMeansCalculator } from '@/utils/kmeansCalculator';
import { saveModelToDB } from '@/utils/modelstorage';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, Calculator, Loader2, PieChart, TrendingUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import ClusterVisualization from './ClusterVisualization';

interface Props {
    foodData: FoodData[];
}

const KMeansClustering: React.FC<Props> = ({ foodData }) => {
    const [clusteredData, setClusteredData] = useState<ScaledFoodData[]>([]);
    const [clusterStats, setClusterStats] = useState<ClusterStats>({});
    const [isCalculating, setIsCalculating] = useState(false);
    const [selectedCluster, setSelectedCluster] = useState<string | null>(null);
    const clusterNames = ['Pagi', 'Siang', 'Malam'];
    const [dataMakanan, setDataMakanan] = useState<ResultFoodData[]>([]);
    useEffect(() => {
        if (foodData.length > 0) {
            calculateClusters();
        }
    }, [foodData]);

    const calculateClusters = async () => {
        setIsCalculating(true);

        setTimeout(async () => {
            const calculator = new KMeansCalculator();
            const result = calculator.performKMeans(foodData, 100, 'RANDOM');
            const stats = calculator.calculateClusterStats(result);
            const valueMakanan: ResultFoodData[] = result.map((item) => {
                return { ...item, clusterResult: clusterNames[item.clusterResult?.cluster || 0] };
            });
            try {
                const response = await saveModelToDB(result, 'kmeans_nutrition_model');
                if (response.success) {
                    console.log('Model saved successfully');
                }
            } catch (error) {
                console.error('Error during clustering calculation:', error);
            }
            setDataMakanan(valueMakanan);
            setClusteredData(result);
            setClusterStats(stats);
            setIsCalculating(false);
        }, 100);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: 'easeOut',
            },
        },
    };

    const statCardVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: 'easeOut',
            },
        },
    };

    if (isCalculating) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex min-h-64 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-50 p-8"
            >
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="mb-4">
                    <Loader2 className="h-12 w-12 text-blue-600" />
                </motion.div>
                <motion.h3 initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-lg font-semibold text-gray-700">
                    Menghitung Clustering...
                </motion.h3>
                <motion.p
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-2 text-sm text-gray-500"
                >
                    Menganalisis pola nutrisi menggunakan algoritma K-Means
                </motion.p>
            </motion.div>
        );
    }

    return (
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8">
            {/* Header Section */}
            <motion.div variants={itemVariants} className="text-center">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-blue-600 p-3"
                >
                    <PieChart className="h-8 w-8 text-white" />
                </motion.div>
                <h2 className="mb-2 text-3xl font-bold text-gray-900">Hasil Clustering Makanan</h2>
                <p className="mx-auto max-w-2xl text-gray-600">
                    Analisis pola nutrisi menggunakan algoritma K-Means untuk mengelompokkan makanan berdasarkan kandungan gizi
                </p>
            </motion.div>

            {/* Cluster Statistics */}
            <motion.div variants={itemVariants}>
                <div className="mb-6 flex items-center justify-between">
                    <h3 className="flex items-center text-xl font-semibold text-gray-900">
                        <BarChart3 className="mr-2 h-6 w-6 text-blue-600" />
                        Statistik Kluster
                    </h3>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={calculateClusters}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                        <Calculator className="mr-1 inline h-4 w-4" />
                        Hitung Ulang
                    </motion.button>
                </div>

                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Object.entries(clusterStats).map(([clusterName, stats], index) => (
                        <motion.div
                            key={clusterName}
                            variants={statCardVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: index * 0.1 }}
                            className={`cursor-pointer rounded-2xl border-2 bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl ${
                                selectedCluster === clusterName ? 'border-blue-500 ring-4 ring-blue-100' : 'border-gray-100'
                            }`}
                            onClick={() => setSelectedCluster(selectedCluster === clusterName ? null : clusterName)}
                            whileHover={{ y: -5 }}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div
                                        className={`mr-3 h-4 w-4 rounded-full ${
                                            clusterName === '0'
                                                ? 'bg-blue-500'
                                                : clusterName === '1'
                                                  ? 'bg-blue-500'
                                                  : clusterName === '2'
                                                    ? 'bg-purple-500'
                                                    : 'bg-orange-500'
                                        }`}
                                    />
                                    <h4 className="font-semibold text-gray-900">Kluster {clusterName}</h4>
                                </div>
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">{stats.count} makanan</span>
                            </div>

                            <AnimatePresence>
                                {selectedCluster === clusterName && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-4 space-y-3"
                                    >
                                        {Object.entries(stats.averages).map(([key, value]) => (
                                            <motion.div
                                                key={key}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="flex items-center justify-between border-b border-gray-100 py-2 last:border-b-0"
                                            >
                                                <span className="text-sm font-medium text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
                                                <span className="text-sm font-bold text-blue-600">
                                                    {typeof value === 'number' ? value.toFixed(2) : value}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {selectedCluster !== clusterName && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center justify-center">
                                    <TrendingUp className="mr-2 h-4 w-4 text-gray-400" />
                                    <span className="text-sm text-gray-500">Klik untuk melihat detail</span>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Visualization Section */}
            <motion.div variants={itemVariants}>
                <ClusterVisualization data={foodData} />
            </motion.div>

            {/* Food Table Section */}
            <motion.div variants={itemVariants}>
                <KlusterFood data={dataMakanan} />
            </motion.div>
        </motion.div>
    );
};

export default KMeansClustering;
