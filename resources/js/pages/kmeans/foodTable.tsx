// components/FoodTable.tsx
import { Table, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScaledFoodData } from '@/types';
import React, { useState } from 'react';

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
            return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        return sortDirection === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
    });

    return (
        <div className="food-table">
            <h3>Tabel Makanan Terkelompok</h3>
            <div className="table-container">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead onClick={() => handleSort('MENU')}>
                                Menu {sortField === 'MENU' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead onClick={() => handleSort('KALORI')}>
                                Kalori {sortField === 'KALORI' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead onClick={() => handleSort('PROTEIN')}>
                                Protein {sortField === 'PROTEIN' && (sortDirection === 'asc' ? '↑' : '↓')}
                            </TableHead>
                            <TableHead>Kluster</TableHead>
                            <TableHead>Jarak ke Centroid</TableHead>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {sortedData.map((item, index) => (
                            <TableRow key={index} className={`cluster-${item.clusterResult?.cluster}`}>
                                <TableCell>{item.MENU}</TableCell>
                                <TableCell>{item.KALORI}</TableCell>
                                <TableCell>{item.PROTEIN}</TableCell>
                                <TableCell>
                                    <span className={`cluster-badge cluster-${item.clusterResult?.cluster}`}>
                                        {item.clusterResult ? ['Pagi', 'Siang', 'Malam'][item.clusterResult.cluster] : 'Unknown'}
                                    </span>
                                </TableCell>
                                <TableCell>{item.clusterResult?.distance.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default FoodTable;
