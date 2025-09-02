// components/FoodTable.tsx
import React, { useState } from 'react';
import { ScaledFoodData } from '@/types';

interface Props {
  data: ScaledFoodData[];
}

const FoodTable: React.FC<Props> = ({ data }) => {
  const [sortField, setSortField] = useState<keyof ScaledFoodData>('MENU');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof ScaledFoodData) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === 'asc'
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  return (
    <div className="food-table">
      <h3>Tabel Makanan Terkelompok</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('MENU')}>Menu {sortField === 'MENU' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('KALORI')}>Kalori {sortField === 'KALORI' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
              <th onClick={() => handleSort('PROTEIN')}>Protein {sortField === 'PROTEIN' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
              <th>Kluster</th>
              <th>Jarak ke Centroid</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index} className={`cluster-${item.clusterResult?.cluster}`}>
                <td>{item.MENU}</td>
                <td>{item.KALORI}</td>
                <td>{item.PROTEIN}</td>
                <td>
                  <span className={`cluster-badge cluster-${item.clusterResult?.cluster}`}>
                    {item.clusterResult ? ['Pagi', 'Siang', 'Malam'][item.clusterResult.cluster] : 'Unknown'}
                  </span>
                </td>
                <td>{item.clusterResult?.distance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodTable;
