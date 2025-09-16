// components/KlusterTable.tsx
import { motion } from 'framer-motion';
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
    data: {
        pagi: ResultFoodData[];
        siang: ResultFoodData[];
        malam: ResultFoodData[];
    };
}

const KlusterTable: React.FC<Props> = ({ data }) => {
    const [sortField, setSortField] = useState<keyof ResultFoodData>('MENU');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Memisahkan data berdasarkan cluster
    const pagiData = data.pagi;
    const siangData = data.siang;
    const malamData = data.malam;

    const handleSort = (field: keyof ResultFoodData) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getClusterColor = (cluster: 'Pagi' | 'Siang' | 'Malam') => {
        switch (cluster) {
            case 'Pagi':
                return 'bg-amber-500 text-white';
            case 'Siang':
                return 'bg-blue-500 text-white';
            case 'Malam':
                return 'bg-purple-500 text-white';
            default:
                return 'bg-gray-500 text-white';
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

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            {[
                                'Waktu',
                                'Menu',
                                'Energi (kkal)',
                                'Protein (g)',
                                'Lemak (g)',
                                'Karbohidrat (g)',
                                'Natrium (mg)',
                                'Kalium (mg)',
                                'Kalsium (mg)',
                                'Magnesium (mg)',
                            ].map((header) => (
                                <th
                                    key={header}
                                    className="border-r border-gray-200 px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-700 uppercase last:border-r-0"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {/* Bagian Pagi */}
                        <tr className="bg-amber-50">
                            <td colSpan={10} className="px-4 py-2 text-sm font-semibold text-amber-800 uppercase">
                                Pagi
                            </td>
                        </tr>
                        {pagiData.map((item, index) => (
                            <motion.tr
                                key={index}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="transition-colors hover:bg-gray-50"
                            >
                                <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-500"></td>
                                <td className="border-r border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">{item.MENU}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.KALORI.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.PROTEIN.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.LEMAK.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">
                                    {item.KARBOHIDRAT.toFixed(1)}
                                </td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.NATRIUM.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.KALIUM.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.KALSIUM.toFixed(1)}</td>
                                <td className="px-4 py-3 text-center text-sm text-gray-500">{item.MAGNESIUM.toFixed(1)}</td>
                            </motion.tr>
                        ))}

                        {/* Bagian Siang */}
                        <tr className="bg-blue-50">
                            <td colSpan={10} className="px-4 py-2 text-sm font-semibold text-blue-800 uppercase">
                                Siang & Sore
                            </td>
                        </tr>
                        {siangData.map((item, index) => (
                            <motion.tr
                                key={index}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="transition-colors hover:bg-gray-50"
                            >
                                <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-500"></td>
                                <td className="border-r border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">{item.MENU}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.KALORI.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.PROTEIN.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.LEMAK.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">
                                    {item.KARBOHIDRAT.toFixed(1)}
                                </td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.NATRIUM.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.KALIUM.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.KALSIUM.toFixed(1)}</td>
                                <td className="px-4 py-3 text-center text-sm text-gray-500">{item.MAGNESIUM.toFixed(1)}</td>
                            </motion.tr>
                        ))}

                        {/* Bagian Malam */}
                        <tr className="bg-purple-50">
                            <td colSpan={10} className="px-4 py-2 text-sm font-semibold text-purple-800 uppercase">
                                Malam
                            </td>
                        </tr>
                        {malamData.map((item, index) => (
                            <motion.tr
                                key={index}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                className="transition-colors hover:bg-gray-50"
                            >
                                <td className="border-r border-gray-200 px-4 py-3 text-sm text-gray-500"></td>
                                <td className="border-r border-gray-200 px-4 py-3 text-sm font-medium text-gray-900">{item.MENU}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.KALORI.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.PROTEIN.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.LEMAK.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">
                                    {item.KARBOHIDRAT.toFixed(1)}
                                </td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.NATRIUM.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.KALIUM.toFixed(1)}</td>
                                <td className="border-r border-gray-200 px-4 py-3 text-center text-sm text-gray-500">{item.KALSIUM.toFixed(1)}</td>
                                <td className="px-4 py-3 text-center text-sm text-gray-500">{item.MAGNESIUM.toFixed(1)}</td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

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

export default KlusterTable;
