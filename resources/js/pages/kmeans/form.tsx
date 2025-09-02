// components/KMeansClustering.tsx
import React, { useState, useEffect } from 'react';
import { FoodData, ScaledFoodData, ClusterStats } from '@/types';
import { KMeansCalculator } from '@/utils/kmeansCalculator';
import ClusterVisualization from './ClusterVisualization';
import FoodTable from './foodTable';

interface Props {
  foodData: FoodData[];
}

const KMeansClustering: React.FC<Props> = ({ foodData }) => {
  const [clusteredData, setClusteredData] = useState<ScaledFoodData[]>([]);
  const [clusterStats, setClusterStats] = useState<ClusterStats>({});
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (foodData.length > 0) {
      calculateClusters();
    }
  }, [foodData]);

  const calculateClusters = () => {
    setIsCalculating(true);

    setTimeout(() => {
      const calculator = new KMeansCalculator();
      const result = calculator.performKMeans(foodData);
      const stats = calculator.calculateClusterStats(result);

      setClusteredData(result);
      setClusterStats(stats);
      setIsCalculating(false);
    }, 100);
  };

  if (isCalculating) {
    return <div className="loading">Menghitung clustering...</div>;
  }

  return (
    <div className="kmeans-clustering">
      <h2>Hasil Clustering Makanan</h2>

      <div className="cluster-stats">
        <h3>Statistik Kluster</h3>
        {Object.entries(clusterStats).map(([clusterName, stats]) => (
          <div key={clusterName} className="cluster-stat-item">
            <h4>Kluster {clusterName} ({stats.count} makanan)</h4>
            <div className="averages">
              {Object.entries(stats.averages).map(([key, value]) => (
                <span key={key} className="stat-item">
                  {key}: {value}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ClusterVisualization data={clusteredData} />
      <FoodTable data={clusteredData} />
    </div>
  );
};

export default KMeansClustering;
