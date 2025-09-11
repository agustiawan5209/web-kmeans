import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Database, Heart, Salad, TrendingUp } from 'lucide-react';
import { useState } from 'react';

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
    // URL gambar makanan sehat untuk hipertensi
    const foodImages = {
        hero: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&auto=format&fit=crop&q=60',
        salad: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=60',
        fish: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop&q=60',
        oatmeal: 'https://images.unsplash.com/photo-1494597564530-871f2b93ac55?w=600&auto=format&fit=crop&q=60',
        vegetables: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=60',
    };

    const stats = [
        {
            title: 'Total Data Makanan',
            value: totalDataMakanan,
            icon: <Database size={24} />,
            image: foodImages.salad,
            description: 'Makanan sehat untuk hipertensi',
        },
        {
            title: 'Total Kriteria',
            value: indikator,
            icon: <TrendingUp size={24} />,
            change: '+2%',
            image: foodImages.fish,
            description: 'Parameter nutrisi penting',
        },
        {
            title: 'Rekomendasi Tersedia',
            value: '50+',
            icon: <Heart size={24} />,
            image: foodImages.oatmeal,
            description: 'Pilihan makanan sehat',
        },
    ];

    const [prediction, setPrediction] = useState<{
        conttoniBasah: { prediction: number; mse: number; rsquared: number };
        conttoniKering: { prediction: number; mse: number; rsquared: number };
        spinosumBasah: { prediction: number; mse: number; rsquared: number };
        spinosumKering: { prediction: number; mse: number; rsquared: number };
    }>({
        conttoniBasah: { prediction: 0, mse: 0, rsquared: 0 },
        conttoniKering: { prediction: 0, mse: 0, rsquared: 0 },
        spinosumBasah: { prediction: 0, mse: 0, rsquared: 0 },
        spinosumKering: { prediction: 0, mse: 0, rsquared: 0 },
    });
    const [actualData, setActualData] = useState<{
        conttoniBasah: number[];
        conttoniKering: number[];
        spinosumBasah: number[];
        spinosumKering: number[];
    }>({
        conttoniBasah: [],
        conttoniKering: [],
        spinosumBasah: [],
        spinosumKering: [],
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Data contoh makanan sehat
    const healthyFoods = [
        { name: 'Salad Sayuran Segar', image: foodImages.salad, nutrients: 'Rendah Sodium, Tinggi Serat' },
        { name: 'Ikan Bakar dengan Lemon', image: foodImages.fish, nutrients: 'Omega-3, Protein' },
        { name: 'Oatmeal dengan Berries', image: foodImages.oatmeal, nutrients: 'Serat, Antioksidan' },
        { name: 'Sayuran Kukus', image: foodImages.vegetables, nutrients: 'Vitamin, Mineral' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-6">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Dashboard Sistem Rekomendasi Makanan</h1>
                    <div className="flex items-center rounded-full bg-blue-50 px-4 py-2">
                        <Heart className="mr-2 h-5 w-5 text-blue-600" />
                        <span className="text-sm text-blue-700">Kesehatan Jantung Anda Prioritas Kami</span>
                    </div>
                </div>

                {/* Header dengan Gambar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-xl shadow-lg"
                >
                    <img src={foodImages.hero} alt="Makanan sehat untuk hipertensi" className="h-64 w-full object-cover" />
                    <div className="absolute inset-0 flex items-center bg-gradient-to-r from-blue-900/70 to-purple-900/50">
                        <div className="p-6 text-white">
                            <h2 className="mb-2 text-2xl font-bold md:text-3xl">Selamat Datang di Sistem Rekomendasi Makanan Sehat</h2>
                            <p className="max-w-2xl text-blue-100">
                                Temukan makanan terbaik untuk mengelola hipertensi dan meningkatkan kesehatan jantung Anda
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Statistik */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="overflow-hidden rounded-lg border border-gray-100 bg-white p-4 shadow-sm"
                        >
                            <div className="flex justify-between">
                                <div className="flex-1">
                                    <p className="text-sm text-gray-500">{stat.title}</p>
                                    <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
                                    <p className="mt-1 text-xs text-blue-500">{stat.change}</p>
                                    <p className="mt-2 text-xs text-gray-400">{stat.description}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="mb-2 rounded-full bg-blue-50 p-2 text-blue-500">{stat.icon}</div>
                                    <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow">
                                        <img src={stat.image} alt={stat.title} className="h-full w-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Rekomendasi Makanan Sehat */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm"
                >
                    <div className="mb-6 flex items-center">
                        <Salad className="mr-2 h-6 w-6 text-green-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Rekomendasi Makanan Sehat</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {healthyFoods.map((food, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -5 }}
                                className="overflow-hidden rounded-lg border border-gray-100 shadow-md transition-all hover:shadow-lg"
                            >
                                <div className="h-40 overflow-hidden">
                                    <img src={food.image} alt={food.name} className="h-full w-full object-cover" />
                                </div>
                                <div className="p-3">
                                    <h3 className="font-medium text-gray-800">{food.name}</h3>
                                    <p className="mt-1 text-xs text-gray-500">{food.nutrients}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Tips Kesehatan */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-lg border border-gray-100 bg-gradient-to-r from-green-50 to-blue-50 p-6 shadow-sm"
                >
                    <div className="mb-4 flex items-center">
                        <Heart className="mr-2 h-6 w-6 text-red-500" />
                        <h2 className="text-xl font-semibold text-gray-800">Tips Diet Sehat untuk Hipertensi</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="flex items-start">
                            <div className="mr-3 rounded-full bg-white p-2 shadow-sm">
                                <span className="font-bold text-green-600">1</span>
                            </div>
                            <div>
                                <h3 className="font-medium">Kurangi Asupan Garam</h3>
                                <p className="mt-1 text-sm text-gray-600">Batasi konsumsi sodium hingga kurang dari 1500mg per hari</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="mr-3 rounded-full bg-white p-2 shadow-sm">
                                <span className="font-bold text-green-600">2</span>
                            </div>
                            <div>
                                <h3 className="font-medium">Perbanyak Serat</h3>
                                <p className="mt-1 text-sm text-gray-600">Konsumsi sayuran, buah, dan whole grain untuk kesehatan jantung</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="mr-3 rounded-full bg-white p-2 shadow-sm">
                                <span className="font-bold text-green-600">3</span>
                            </div>
                            <div>
                                <h3 className="font-medium">Pilih Protein Sehat</h3>
                                <p className="mt-1 text-sm text-gray-600">Ikan, kacang-kacangan, dan unggas tanpa lemak sebagai pilihan terbaik</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="mr-3 rounded-full bg-white p-2 shadow-sm">
                                <span className="font-bold text-green-600">4</span>
                            </div>
                            <div>
                                <h3 className="font-medium">Monitor Tekanan Darah</h3>
                                <p className="mt-1 text-sm text-gray-600">Periksa secara rutin dan catat perkembangannya</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AppLayout>
    );
}
