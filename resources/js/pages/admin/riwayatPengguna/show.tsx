import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, IndikatorTypes } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
};

const capitalize = (str: string) => {
    return str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

const getWaterQualityColor = (ph: number) => {
    if (ph < 6.5) return 'bg-red-100 text-red-800';
    if (ph < 7.5) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
};

interface HarvestDetailProps {
    riwayatPengguna: {
        id: number;
        user: { name: string; email: string; alamat: string };
        nama: string;
        jenkel: string;
        usia: string;
        berat_badan: string;
        tinggi_badan: string;
        tekanan_sistolik: string;
        tekanan_diastolik: string;
        riwayat_penyakit: string;
        alergi_makanan: string;
        hipertensi: string;
    };
    breadcrumb: BreadcrumbItem[];
    indikator: IndikatorTypes[];
    titlePage: string;
}

interface HypertensionClassification {
    type: string;
    color: string;
    bgColor: string;
}

export default function HarvestDetailPage({ riwayatPengguna, breadcrumb, indikator, titlePage }: HarvestDetailProps) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => (breadcrumb ? breadcrumb.map((item) => ({ title: item.title, href: item.href })) : []),
        [breadcrumb],
    );
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={titlePage ?? 'Detail'} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-7xl">
                    {/* Header */}
                    <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ duration: 0.5 }} className="mb-10 text-center">
                        <h1 className="mb-2 text-3xl font-bold text-gray-900">Detail Data Rekomendasi Makanan</h1>
                    </motion.div>
                    {/* Summary Cards */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2"
                    >
                        {/* Water Quality */}
                        <div className="overflow-hidden rounded-xl border-l-4 border-yellow-500 bg-white p-6 shadow-md">
                            <h3 className="text-sm font-medium text-gray-500">Data Pengguna</h3>
                            <div className="mt-4">
                                <div className="flex justify-between py-1">
                                    <span className="text-sm text-gray-600">Nama </span>
                                    <span className="text-sm font-medium">{riwayatPengguna.user.name}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-sm text-gray-600">Email </span>
                                    <span className="text-sm font-medium">{riwayatPengguna.user.email}</span>
                                </div>
                                <div className="flex justify-between py-1">
                                    <span className="text-sm text-gray-600">Alamat </span>
                                    <span className="text-sm font-medium">{riwayatPengguna.user.alamat}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Detailed Parameters */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mb-10 overflow-hidden rounded-xl bg-white shadow-md"
                    >
                        <div className="p-6">
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-800">Detail Data Kesehatan</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Nama Lengkap</h3>
                                        <p className="text-lg font-semibold">{riwayatPengguna.nama}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Jenis Kelamin</h3>
                                        <p className="text-lg font-semibold">{riwayatPengguna.jenkel}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Usia</h3>
                                        <p className="text-lg font-semibold">{riwayatPengguna.usia} tahun</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Berat & Tinggi Badan</h3>
                                        <p className="text-lg font-semibold">
                                            {riwayatPengguna.berat_badan} kg / {riwayatPengguna.tinggi_badan} cm
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Tekanan Darah</h3>
                                        <p className="text-lg font-semibold">
                                            {riwayatPengguna.tekanan_sistolik} / {riwayatPengguna.tekanan_diastolik} mmHg
                                        </p>
                                        {riwayatPengguna.tekanan_sistolik && riwayatPengguna.tekanan_diastolik && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                                                    classifyHypertension(
                                                        parseInt(riwayatPengguna.tekanan_sistolik) || 0,
                                                        parseInt(riwayatPengguna.tekanan_diastolik) || 0,
                                                    ).bgColor
                                                } ${
                                                    classifyHypertension(
                                                        parseInt(riwayatPengguna.tekanan_sistolik) || 0,
                                                        parseInt(riwayatPengguna.tekanan_diastolik) || 0,
                                                    ).color
                                                }`}
                                            >
                                                {riwayatPengguna.hipertensi}
                                            </motion.span>
                                        )}
                                    </div>

                                    {riwayatPengguna.berat_badan && riwayatPengguna.tinggi_badan && (
                                        <div>
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Indeks Massa Tubuh (BMI)</h3>
                                            {calculateBMI(
                                                parseFloat(riwayatPengguna.berat_badan) || 0,
                                                parseFloat(riwayatPengguna.tinggi_badan) || 0,
                                            ) && (
                                                <>
                                                    <p className="text-lg font-semibold">
                                                        {
                                                            calculateBMI(
                                                                parseFloat(riwayatPengguna.berat_badan) || 0,
                                                                parseFloat(riwayatPengguna.tinggi_badan) || 0,
                                                            ).value
                                                        }
                                                    </p>
                                                    <p
                                                        className={
                                                            calculateBMI(
                                                                parseFloat(riwayatPengguna.berat_badan) || 0,
                                                                parseFloat(riwayatPengguna.tinggi_badan) || 0,
                                                            ).color
                                                        }
                                                    >
                                                        {
                                                            calculateBMI(
                                                                parseFloat(riwayatPengguna.berat_badan) || 0,
                                                                parseFloat(riwayatPengguna.tinggi_badan) || 0,
                                                            ).category
                                                        }
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Riwayat Penyakit</h3>
                                        <p className="text-lg font-semibold">{riwayatPengguna.riwayat_penyakit || 'Tidak ada riwayat penyakit'}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Alergi Makanan</h3>
                                        <p className="text-lg font-semibold">{riwayatPengguna.alergi_makanan || 'Tidak ada alergi makanan'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}
