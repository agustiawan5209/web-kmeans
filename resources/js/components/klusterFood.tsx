// components/KlusterFood.tsx
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

export interface ResultFoodData {
    MENU: string;
    KALORI: number;
    PROTEIN: number;
    LEMAK: number;
    KARBOHIDRAT: number;
    NATRIUM: number;
    KALIUM: number;
    KALSIUM: number;
    MAGNESIUM: number;
    clusterResult: 'Pagi' | 'Siang' | 'Malam';
}

interface Props {
    data: ResultFoodData[];
}

const KlusterFood: React.FC<Props> = ({ data }) => {
    const [activeTab, setActiveTab] = useState<'Pagi' | 'Siang' | 'Malam'>('Pagi');
    const [sortField, setSortField] = useState<keyof ResultFoodData>('MENU');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Memisahkan data berdasarkan cluster
    const pagiData = data.filter((item) => item.clusterResult === 'Pagi');
    const siangData = data.filter((item) => item.clusterResult === 'Siang');
    const malamData = data.filter((item) => item.clusterResult === 'Malam');

    const handleSort = (field: keyof ResultFoodData) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const sortData = (dataToSort: ResultFoodData[]) => {
        return [...dataToSort].sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
            }

            return sortDirection === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
        });
    };

    const getActiveData = () => {
        switch (activeTab) {
            case 'Pagi':
                return sortData(pagiData);
            case 'Siang':
                return sortData(siangData);
            case 'Malam':
                return sortData(malamData);
            default:
                return [];
        }
    };

    const getClusterColor = (cluster: 'Pagi' | 'Siang' | 'Malam') => {
        switch (cluster) {
            case 'Pagi':
                return 'bg-amber-100 text-amber-800 border-amber-300';
            case 'Siang':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'Malam':
                return 'bg-indigo-100 text-indigo-800 border-indigo-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <div className="rounded-xl bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Rekomendasi Makanan Berdasarkan Waktu</h2>

            {/* Tab Navigation */}
            <div className="mb-6 flex border-b border-gray-200">
                {(['Pagi', 'Siang', 'Malam'] as const).map((time) => (
                    <button
                        key={time}
                        className={`rounded-t-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            activeTab === time
                                ? `${getClusterColor(time).split(' ')[0]} ${getClusterColor(time).split(' ')[1]} border-t border-r border-l`
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                        }`}
                        onClick={() => setActiveTab(time)}
                    >
                        {time} ({time === 'Pagi' ? pagiData.length : time === 'Siang' ? siangData.length : malamData.length})
                    </button>
                ))}
            </div>

            {/* Summary Cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                {(['Pagi', 'Siang', 'Malam'] as const).map((time) => {
                    const clusterData = time === 'Pagi' ? pagiData : time === 'Siang' ? siangData : malamData;
                    const totalKalori = clusterData.reduce((sum, item) => sum + item.KALORI, 0);
                    const totalProtein = clusterData.reduce((sum, item) => sum + item.PROTEIN, 0);

                    return (
                        <motion.div key={time} whileHover={{ y: -5 }} className={`rounded-lg border p-4 ${getClusterColor(time)}`}>
                            <h3 className="mb-2 font-semibold">Makanan {time}</h3>
                            <p className="text-sm">Jumlah: {clusterData.length} menu</p>
                            <p className="text-sm">Total Kalori: {totalKalori.toFixed(0)} kcal</p>
                            <p className="text-sm">Total Protein: {totalProtein.toFixed(1)} g</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg shadow">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['MENU', 'KALORI', 'PROTEIN', 'LEMAK', 'KARBOHIDRAT', 'KLUSTER'].map((header) => (
                                <th
                                    key={header}
                                    className="cursor-pointer px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase transition-colors hover:bg-gray-100"
                                    onClick={() => handleSort(header === 'KLUSTER' ? 'clusterResult' : (header as keyof ResultFoodData))}
                                >
                                    <div className="flex items-center">
                                        {header}
                                        {sortField === (header === 'KLUSTER' ? 'clusterResult' : (header as keyof ResultFoodData)) && (
                                            <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        <AnimatePresence>
                            {getActiveData().map((item, index) => (
                                <motion.tr
                                    key={index}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    className="transition-colors hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 text-sm font-medium whitespace-nowrap text-gray-900">{item.MENU}</td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-500">{item.KALORI} kcal</td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-500">{item.PROTEIN}g</td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-500">{item.LEMAK}g</td>
                                    <td className="px-4 py-3 text-sm whitespace-nowrap text-gray-500">{item.KARBOHIDRAT}g</td>
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className={`rounded-full px-2 py-1 text-xs font-medium ${getClusterColor(item.clusterResult)}`}>
                                            {item.clusterResult}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {getActiveData().length === 0 && <div className="py-8 text-center text-gray-500">Tidak ada data makanan untuk waktu {activeTab}</div>}

            {/* Info Nutrition */}
            <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <h3 className="mb-2 font-semibold text-blue-800">Informasi Gizi</h3>
                <p className="text-sm text-blue-700">
                    Rekomendasi makanan ini dikelompokkan berdasarkan waktu konsumsi yang optimal untuk memaksimalkan penyerapan nutrisi dan menjaga
                    keseimbangan energi sepanjang hari.
                </p>
            </div>
        </div>
    );
};

export default KlusterFood;
