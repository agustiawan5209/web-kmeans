import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/layouts/guest/main-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Database, TrendingUp } from 'lucide-react';
// Import the default export from each file
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardViewProps {
    baseJenisRumputLaut: string[];
    totalDataMakanan: number;
    indikator: number;
}

export default function Dashboard({ baseJenisRumputLaut, totalDataMakanan, indikator }: DashboardViewProps) {
    const stats = [
        { title: 'Total Data Makanan', value: totalDataMakanan, icon: <Database size={24} /> },
        // { title: 'Model Tersedia', value: '4', icon: <Leaf size={24} /> },
        { title: 'Total Indikator', value: indikator, icon: <TrendingUp size={24} />, change: '+2%' },
    ];

    return (
        <MainLayout>
            <Head title="Dashboard" />
            <div className="container mx-auto h-[80vh] py-6">
                <Card className="mx-auto max-w-5xl">
                    <CardContent>
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard Sistem Rekomendasi Makanan</h1>

                        {/* Statistik */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.title}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
                                >
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">{stat.title}</p>
                                            <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
                                            <p className="mt-1 text-xs text-blue-500">{stat.change}</p>
                                        </div>
                                        <div className="rounded-full bg-blue-50 p-2 text-blue-500">{stat.icon}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
}
