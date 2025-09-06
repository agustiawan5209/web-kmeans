// components/ClusterVisualization.tsx
import { ScaledFoodData } from '@/types';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js';
import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, ChevronDown, ChevronUp, PieChart, Target } from 'lucide-react';
import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

interface Props {
    data: ScaledFoodData[];
}

const ClusterVisualization: React.FC<Props> = ({ data }) => {
    const [activeChart, setActiveChart] = React.useState<'scatter' | 'bar' | 'doughnut'>('bar');
    const [isExpanded, setIsExpanded] = React.useState(false);

    const clusterColors = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];
    const clusterNames = ['Pagi', 'Siang', 'Malam'];
    const projectTo2D = (values: number[], distance: number) => {
        // Simple projection untuk visualisasi
        const x = distance + values[0]; // Kalori + Lemak
        const y = values[3] * 100 + values[1] * 50; // Karbohidrat + Protein
        return { x, y };
    };
    // Prepare data for scatter chart
    const scatterData = {
        datasets: data.map((item, index) => {
            const cluster = item.clusterResult?.cluster || 0;
            const distance = item.clusterResult?.distance || 0;
            const point = projectTo2D(item.scaledValues, distance);

            return {
                label: `${item.MENU} (${clusterNames[cluster]})`,
                data: [
                    {
                        x: point.x,
                        y: distance,
                    },
                ],
                backgroundColor: clusterColors[cluster],
                borderColor: clusterColors[cluster],
                borderWidth: 2,
                pointRadius: 8,
                pointHoverRadius: 12,
            };
        }),
    };

    const scatterOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Distribusi Kalori vs Protein per Kluster',
                font: {
                    size: 16,
                    weight: 'bold' as const,
                },
                color: '#374151',
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const point = context.raw;
                        const menu = context.dataset.label || 'Unknown';
                        return `${menu}`;
                    },
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Kalori (kcal)',
                    font: {
                        size: 14,
                        weight: 'bold' as const,
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Protein (g)',
                    font: {
                        size: 14,
                        weight: 'bold' as const,
                    },
                },
            },
        },
    };

    // Prepare data for bar chart (average nutrients per cluster)
    const clusterAverages = React.useMemo(() => {
        const clusters: { [key: number]: { count: number; sums: number[] } } = {};

        data.forEach((item) => {
            const cluster = item.clusterResult?.cluster || 0;
            if (!clusters[cluster]) {
                clusters[cluster] = { count: 0, sums: new Array(5).fill(0) };
            }
            clusters[cluster].count++;
            item.scaledValues?.forEach((value, index) => {
                clusters[cluster].sums[index] += value;
            });
        });

        return Object.entries(clusters).map(([cluster, { count, sums }]) => ({
            cluster: parseInt(cluster),
            averages: sums.map((sum) => sum / count),
        }));
    }, [data]);

    const barData = {
        labels: ['Kalori', 'Protein', 'Lemak', 'Karbohidrat', 'Natrium'],
        datasets: clusterAverages.map(({ cluster, averages }) => ({
            label: clusterNames[cluster],
            data: averages,
            backgroundColor: clusterColors[cluster],
            borderColor: clusterColors[cluster],
            borderWidth: 2,
        })),
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Rata-rata Nutrisi per Kluster',
                font: {
                    size: 16,
                    weight: 'bold' as const,
                },
                color: '#374151',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Jumlah',
                    font: {
                        size: 14,
                    },
                },
            },
        },
    };

    // Prepare data for doughnut chart (cluster distribution)
    const clusterDistribution = React.useMemo(() => {
        const distribution: number[] = new Array(clusterNames.length).fill(0);
        data.forEach((item) => {
            const cluster = item.clusterResult?.cluster || 0;
            distribution[cluster]++;
        });
        return distribution;
    }, [data]);

    const doughnutData = {
        labels: clusterNames,
        datasets: [
            {
                data: clusterDistribution,
                backgroundColor: clusterColors,
                borderColor: clusterColors.map((color) => color + '80'),
                borderWidth: 2,
                hoverOffset: 15,
            },
        ],
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Distribusi Jumlah Makanan per Kluster',
                font: {
                    size: 16,
                    weight: 'bold' as const,
                },
                color: '#374151',
            },
            legend: {
                position: 'right' as const,
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    const chartTabs = [
        // { id: 'scatter' as const, label: 'Scatter Plot', icon: ScatterChart },
        { id: 'bar' as const, label: 'Bar Chart', icon: BarChart3 },
        { id: 'doughnut' as const, label: 'Doughnut', icon: PieChart },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
        >
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                    <div className="mr-3 rounded-lg bg-blue-100 p-2">
                        <Target className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">Visualisasi Kluster</h3>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-2 text-gray-500 transition-colors hover:text-gray-700"
                >
                    {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </motion.button>
            </div>

            {/* Chart Type Selector */}
            <div className="mb-6 flex flex-wrap gap-2">
                {chartTabs.map(({ id, label, icon: Icon }) => (
                    <motion.button
                        key={id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveChart(id)}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                            activeChart === id ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        <Icon className="mr-2 inline h-4 w-4" />
                        {label}
                    </motion.button>
                ))}
            </div>

            {/* Chart Container */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeChart}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className={`relative ${isExpanded ? 'h-96' : 'h-64'} mb-4`}
                >
                    {/* {activeChart === 'scatter' && <Scatter data={scatterData} options={scatterOptions} />} */}
                    {activeChart === 'bar' && <Bar data={barData} options={barOptions} />}
                    {activeChart === 'doughnut' && <Doughnut data={doughnutData} options={doughnutOptions} />}
                </motion.div>
            </AnimatePresence>

            {/* Cluster Legend */}
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
                {clusterNames.map((name, index) => (
                    <motion.div
                        key={name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center rounded-lg bg-gray-50 p-3"
                    >
                        <div className="mr-2 h-4 w-4 rounded-full" style={{ backgroundColor: clusterColors[index] }} />
                        <span className="text-sm font-medium text-gray-700">{name}</span>
                        <span className="ml-auto text-xs text-gray-500">{clusterDistribution[index]} items</span>
                    </motion.div>
                ))}
            </div>

            {/* Info Panel */}
            {/* <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4"
            >
                <p className="text-sm text-blue-700">
                    <strong>Tip:</strong> Gunakan visualisasi ini untuk memahami pola distribusi nutrisi dan karakteristik masing-masing kluster
                    makanan.
                </p>
            </motion.div> */}
        </motion.div>
    );
};

export default ClusterVisualization;
