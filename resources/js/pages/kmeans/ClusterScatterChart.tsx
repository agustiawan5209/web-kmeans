// components/ClusterScatterChart.tsx
import { FoodData, ScaledFoodData } from '@/types';
import { KMeansCalculator } from '@/utils/kmeansCalculator';
import React from 'react';
import { CartesianGrid, Cell, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';

interface ClusterScatterChartProps {
    data: FoodData[];
    scaledData?: ScaledFoodData[];
    featureX: keyof FoodData;
    featureY: keyof FoodData;
    height?: number;
    width?: number;
}

export const ClusterScatterChart: React.FC<ClusterScatterChartProps> = ({ data, scaledData, featureX, featureY, height = 400, width = 600 }) => {
    const kmeansCalculator = new KMeansCalculator();

    // Jika scaledData tidak disediakan, lakukan clustering
    const clusterData = scaledData || kmeansCalculator.performKMeans(data);

    // Siapkan data untuk chart
    const chartData = clusterData.map((item, index) => ({
        id: index,
        name: item.MENU || `Item ${index + 1}`,
        x: item[featureX],
        y: item[featureY],
        cluster: item.clusterResult?.cluster !== undefined ? kmeansCalculator.getClusterName(item.clusterResult.cluster) : 'Unknown',
        clusterNumber: item.clusterResult?.cluster || -1,
        distance: item.clusterResult?.distance || 0,
    }));

    // Warna untuk setiap cluster
    const clusterColors = {
        Pagi: '#FF6B6B',
        Siang: '#4ECDC4',
        Malam: '#45B7D1',
        Unknown: '#96A0B5',
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="rounded border border-gray-200 bg-white p-3 shadow-md">
                    <p className="font-bold">{data.name}</p>
                    <p className="text-sm">{`Cluster: ${data.cluster}`}</p>
                    <p className="text-sm">{`${featureX}: ${data.x}`}</p>
                    <p className="text-sm">{`${featureY}: ${data.y}`}</p>
                    <p className="text-sm">{`Distance: ${data.distance.toFixed(2)}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-4 text-center text-lg font-semibold">
                K-Means Clustering Results: {featureX} vs {featureY}
            </h3>

            <ResponsiveContainer width="100%" height={height}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" name={featureX} label={{ value: featureX, position: 'insideBottom', offset: -5 }} />
                    <YAxis type="number" dataKey="y" name={featureY} label={{ value: featureY, angle: -90, position: 'insideLeft' }} />
                    <ZAxis type="number" dataKey="distance" name="Distance" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Scatter name="Clusters" data={chartData} fill="#8884d8">
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={clusterColors[entry.cluster as keyof typeof clusterColors] || '#96A0B5'} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>

            <div className="mt-4 flex justify-center gap-4">
                {Object.entries(clusterColors).map(([cluster, color]) => (
                    <div key={cluster} className="flex items-center">
                        <div className="mr-2 h-4 w-4 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-sm">{cluster}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};
