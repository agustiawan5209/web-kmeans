// components/ClusterVisualization.tsx
import React from 'react';
import { ScaledFoodData } from '@/types';

interface Props {
  data: ScaledFoodData[];
}

const ClusterVisualization: React.FC<Props> = ({ data }) => {
  const clusterColors = ['#ff6b6b', '#4ecdc4', '#45b7d1'];
  const clusterNames = ['Pagi', 'Siang', 'Malam'];

  // Simple 2D projection (bisa diganti dengan PCA yang lebih sophisticated)
  const projectTo2D = (values: number[]) => {
    // Simple projection untuk visualisasi
    const x = values[0] * 100 + values[2] * 50; // Kalori + Lemak
    const y = values[3] * 100 + values[1] * 50; // Karbohidrat + Protein
    return { x, y };
  };

  return (
    <div className="cluster-visualization">
      <h3>Visualisasi Kluster</h3>
      <div className="visualization-container">
        <svg width={600} height={400} className="cluster-svg">
          {/* Grid lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <g key={i}>
              <line x1={i * 60} y1={0} x2={i * 60} y2={400} stroke="#eee" />
              <line x1={0} y1={i * 40} x2={600} y2={i * 40} stroke="#eee" />
            </g>
          ))}

          {/* Data points */}
          {data.map((item, index) => {
            const point = projectTo2D(item.scaledValues);
            const cluster = item.clusterResult?.cluster || 0;

            return (
              <circle
                key={index}
                cx={point.x + 300}
                cy={point.y + 200}
                r={6}
                fill={clusterColors[cluster]}
                stroke="#333"
                strokeWidth={1}
                className="data-point"
                xlinkTitle={`${item.MENU} (${clusterNames[cluster]})`}
              />
            );
          })}

          {/* Legend */}
          <g transform="translate(20, 20)">
            {clusterNames.map((name, index) => (
              <g key={name} transform={`translate(0, ${index * 25})`}>
                <rect width={15} height={15} fill={clusterColors[index]} />
                <text x={25} y={12} fontSize={12}>
                  {name}
                </text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    </div>
  );
};

export default ClusterVisualization;
