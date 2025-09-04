import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useState } from 'react';

interface HarvestData {
    id: number;
    bulan: string;
    tahun: number;
    total_dataset: string;
    jenisRumputLaut: string[];
}

const HarvestDataTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof HarvestData; direction: 'asc' | 'desc' } | null>(null);

    // Data contoh - nanti diganti dengan data dari Laravel
    const data: HarvestData[] = [
        { id: 1, bulan: 'Januari', tahun: 2024, total_dataset: '125 kg', jenisRumputLaut: ['Eucheuma Cottonii'] },
        { id: 2, bulan: 'Februari', tahun: 2024, total_dataset: '98 kg', jenisRumputLaut: ['Gracilaria'] },
        { id: 3, bulan: 'Maret', tahun: 2024, total_dataset: '145 kg', jenisRumputLaut: ['Eucheuma Cottonii', 'Gracilaria'] },
        { id: 4, bulan: 'April', tahun: 2024, total_dataset: '112 kg', jenisRumputLaut: ['Eucheuma Cottonii'] },
        { id: 5, bulan: 'Mei', tahun: 2024, total_dataset: '156 kg', jenisRumputLaut: ['Gracilaria'] },
    ];

    const sortedData = [...data];
    if (sortConfig !== null) {
        sortedData.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }

    const filteredData = sortedData.filter(
        (item) =>
            item.bulan.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tahun.toString().includes(searchTerm) ||
            item.total_dataset.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const requestSort = (key: keyof HarvestData) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm"
        >
            <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <h2 className="text-lg font-semibold">Data Dataset</h2>
                <div className="relative">
                    <Search className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400" size={16} />
                    <input
                        type="text"
                        placeholder="Cari data dataset..."
                        className="rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th
                                className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                onClick={() => requestSort('bulan')}
                            >
                                <div className="flex items-center">
                                    Bulan
                                    {sortConfig?.key === 'bulan' &&
                                        (sortConfig.direction === 'asc' ? (
                                            <ChevronUp size={16} className="ml-1" />
                                        ) : (
                                            <ChevronDown size={16} className="ml-1" />
                                        ))}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                onClick={() => requestSort('tahun')}
                            >
                                <div className="flex items-center">
                                    Tahun
                                    {sortConfig?.key === 'tahun' &&
                                        (sortConfig.direction === 'asc' ? (
                                            <ChevronUp size={16} className="ml-1" />
                                        ) : (
                                            <ChevronDown size={16} className="ml-1" />
                                        ))}
                                </div>
                            </th>
                            <th
                                className="cursor-pointer px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                onClick={() => requestSort('total_dataset')}
                            >
                                <div className="flex items-center">
                                    Total Makanan
                                    {sortConfig?.key === 'total_dataset' &&
                                        (sortConfig.direction === 'asc' ? (
                                            <ChevronUp size={16} className="ml-1" />
                                        ) : (
                                            <ChevronDown size={16} className="ml-1" />
                                        ))}
                                </div>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Jenis Rumput Laut</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                        {filteredData.map((item) => (
                            <motion.tr
                                key={item.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ backgroundColor: 'rgba(240, 253, 244, 1)' }}
                                className="hover:bg-blue-50"
                            >
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{item.bulan}</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{item.tahun}</td>
                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-blue-600">{item.total_dataset}</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                    <div className="flex flex-wrap gap-1">
                                        {item.jenisRumputLaut.map((jenis, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                                            >
                                                {jenis}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default HarvestDataTable;
