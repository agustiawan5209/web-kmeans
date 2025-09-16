import KlusterTable from '@/components/kluster-table';
import MainLayout from '@/layouts/guest/main-layout';
import { ResultFoodData, RiwayatPenggunaTypes, ScaledFoodData } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface HypertensionClassification {
    type: string;
    color: string;
    bgColor: string;
}

export default function HealthDataView({ healthData, kluster }: { healthData: RiwayatPenggunaTypes[]; kluster: ScaledFoodData[] }) {
    const clusterNames = ['Pagi', 'Siang', 'Malam'];
    const dataMakanan: ResultFoodData[] = kluster.map((item) => {
        return { ...item, clusterResult: clusterNames[item.clusterResult?.cluster || 0] };
    });
    const [selectedData, setSelectedData] = useState<RiwayatPenggunaTypes | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    console.log(healthData);

    const classifyHypertension = (sistolik: number, diastolik: number): HypertensionClassification => {
        if (sistolik >= 180 && diastolik >= 120) {
            return { type: 'Hipertensi Krisis', color: 'text-red-600', bgColor: 'bg-red-100' };
        } else if (sistolik >= 140 && diastolik >= 90) {
            return { type: 'Hipertensi Tahap 2', color: 'text-orange-600', bgColor: 'bg-orange-100' };
        } else if (sistolik >= 130 && diastolik >= 80) {
            return { type: 'Hipertensi Tahap 1', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
        } else if (sistolik >= 120 && diastolik < 80) {
            return { type: 'Prahipertensi', color: 'text-blue-600', bgColor: 'bg-blue-100' };
        } else {
            return { type: 'Normal', color: 'text-green-600', bgColor: 'bg-green-100' };
        }
    };

    const calculateBMI = (berat: number, tinggi: number): { value: number; category: string; color: string } => {
        // Konversi tinggi dari cm ke m
        const heightInMeter = tinggi / 100;
        const bmi = berat / (heightInMeter * heightInMeter);

        let category = '';
        let color = '';

        if (bmi < 18.5) {
            category = 'Kekurangan berat badan';
            color = 'text-blue-600';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal (ideal)';
            color = 'text-green-600';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Kelebihan berat badan';
            color = 'text-yellow-600';
        } else {
            category = 'Obesitas';
            color = 'text-red-600';
        }

        return { value: parseFloat(bmi.toFixed(1)), category, color };
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5 },
        },
    };

    if (healthData === null || healthData.length === 0) {
        return (
            <MainLayout>
                <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg"
                    >
                        <div className="mb-4 text-5xl">📋</div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-800">Tidak Ada Data</h2>
                        <p className="mb-6 text-gray-600">Belum ada data kesehatan yang tersimpan. Silakan isi form terlebih dahulu.</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-lg bg-blue-500 px-6 py-2 font-medium text-white"
                            onClick={() => (window.location.href = '/')} // Ganti dengan route form Anda
                        >
                            Kembali ke Form
                        </motion.button>
                    </motion.div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title="Data Kesehatan Pengguna" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
                <div className="container mx-auto max-w-6xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 text-center"
                    >
                        <h1 className="mb-2 text-3xl font-bold text-gray-800">Data Kesehatan Pengguna</h1>
                        <p className="text-gray-600">Rekam medis dan hasil analisis kesehatan</p>
                        <p className="mt-2 text-sm text-gray-500">Total: {healthData.length} data tersimpan</p>
                    </motion.div>

                    {selectedData ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="mb-8 overflow-hidden rounded-xl bg-white shadow-lg"
                        >
                            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1"></div>
                            <div className="p-6">
                                <div className="mb-6 flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-800">Detail Data Kesehatan</h2>
                                    <button onClick={() => setSelectedData(null)} className="text-2xl text-gray-500 hover:text-gray-700">
                                        ✕
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Nama Lengkap</h3>
                                            <p className="text-lg font-semibold">{selectedData.nama}</p>
                                        </div>

                                        <div>
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Jenis Kelamin</h3>
                                            <p className="text-lg font-semibold">{selectedData.jenkel}</p>
                                        </div>

                                        <div>
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Usia</h3>
                                            <p className="text-lg font-semibold">{selectedData.usia} tahun</p>
                                        </div>

                                        <div>
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Berat & Tinggi Badan</h3>
                                            <p className="text-lg font-semibold">
                                                {selectedData.berat_badan} kg / {selectedData.tinggi_badan} cm
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Tekanan Darah</h3>
                                            <p className="text-lg font-semibold">
                                                {selectedData.tekanan_sistolik} / {selectedData.tekanan_diastolik} mmHg
                                            </p>
                                            {selectedData.tekanan_sistolik && selectedData.tekanan_diastolik && (
                                                <motion.span
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                                                        classifyHypertension(
                                                            parseInt(selectedData.tekanan_sistolik) || 0,
                                                            parseInt(selectedData.tekanan_diastolik) || 0,
                                                        ).bgColor
                                                    } ${
                                                        classifyHypertension(
                                                            parseInt(selectedData.tekanan_sistolik) || 0,
                                                            parseInt(selectedData.tekanan_diastolik) || 0,
                                                        ).color
                                                    }`}
                                                >
                                                    Tingkatan Jenis Hipertensi: {selectedData.hipertensi}
                                                </motion.span>
                                            )}
                                        </div>

                                        {selectedData.berat_badan && selectedData.tinggi_badan && (
                                            <div>
                                                <h3 className="mb-1 text-sm font-medium text-gray-500">Indeks Massa Tubuh (IMT)</h3>
                                                {calculateBMI(
                                                    parseFloat(selectedData.berat_badan) || 0,
                                                    parseFloat(selectedData.tinggi_badan) || 0,
                                                ) && (
                                                    <>
                                                        <p className="text-lg font-semibold">
                                                            {
                                                                calculateBMI(
                                                                    parseFloat(selectedData.berat_badan) || 0,
                                                                    parseFloat(selectedData.tinggi_badan) || 0,
                                                                ).value
                                                            }
                                                        </p>
                                                        <p
                                                            className={
                                                                calculateBMI(
                                                                    parseFloat(selectedData.berat_badan) || 0,
                                                                    parseFloat(selectedData.tinggi_badan) || 0,
                                                                ).color
                                                            }
                                                        >
                                                            {
                                                                calculateBMI(
                                                                    parseFloat(selectedData.berat_badan) || 0,
                                                                    parseFloat(selectedData.tinggi_badan) || 0,
                                                                ).category
                                                            }
                                                        </p>
                                                    </>
                                                )}
                                            </div>
                                        )}

                                        <div>
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Riwayat Penyakit</h3>
                                            <p className="text-lg font-semibold">{selectedData.riwayat_penyakit || 'Tidak ada riwayat penyakit'}</p>
                                        </div>

                                        <div>
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Alergi Makanan</h3>
                                            <p className="text-lg font-semibold">{selectedData.alergi_makanan || 'Tidak ada alergi makanan'}</p>
                                        </div>
                                    </div>
                                </div>
                                <KlusterTable data={selectedData.kluster} />
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                            >
                                {healthData.map((data, index) => {
                                    const hypertension =
                                        data.tekanan_sistolik && data.tekanan_diastolik
                                            ? classifyHypertension(parseInt(data.tekanan_sistolik) || 0, parseInt(data.tekanan_diastolik) || 0)
                                            : null;

                                    const bmi =
                                        data.berat_badan && data.tinggi_badan
                                            ? calculateBMI(parseFloat(data.berat_badan) || 0, parseFloat(data.tinggi_badan) || 0)
                                            : null;

                                    return (
                                        <motion.div
                                            key={index}
                                            variants={cardVariants}
                                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                            className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
                                            onClick={() => setSelectedData(data)}
                                        >
                                            <div className={`p-4 ${hypertension?.bgColor || 'bg-gray-100'}`}>
                                                <h3 className="truncate text-xl font-bold text-gray-800">{data.nama || 'Tidak ada nama'}</h3>
                                                <p className="text-gray-600">
                                                    {data.jenkel || 'Tidak diketahui'}, {data.usia || '0'} tahun
                                                </p>
                                            </div>

                                            <div className="p-4">
                                                <div className="mb-3 flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">Tekanan Darah</span>
                                                    {hypertension && (
                                                        <span
                                                            className={`rounded-full px-2 py-1 text-xs ${hypertension.bgColor} ${hypertension.color}`}
                                                        >
                                                            {hypertension.type}
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="mb-4 text-lg font-semibold">
                                                    {data.tekanan_sistolik && data.tekanan_diastolik
                                                        ? `${data.tekanan_sistolik}/${data.tekanan_diastolik} mmHg`
                                                        : 'Tidak ada data'}
                                                </p>

                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-sm text-gray-500">BMI</span>
                                                        {bmi && (
                                                            <p className={`text-lg font-semibold ${bmi.color}`}>
                                                                {bmi.value} <span className="text-xs">({bmi.category})</span>
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="text-right">
                                                        <span className="text-sm text-gray-500">Berat/Tinggi</span>
                                                        <p className="text-lg font-semibold">
                                                            {data.berat_badan || '-'} kg / {data.tinggi_badan || '-'} cm
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 p-3 text-center text-sm text-gray-500">Klik untuk melihat detail</div>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-center">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mr-4 rounded-lg bg-blue-500 px-6 py-2 font-medium text-white"
                                    onClick={() => (window.location.href = '/form/rekomendasi')} // Ganti dengan route form Anda
                                >
                                    Tambah Data Baru
                                </motion.button>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
