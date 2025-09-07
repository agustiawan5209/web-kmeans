import KlusterFood from '@/components/klusterFood';
import MainLayout from '@/layouts/guest/main-layout';
import { ResultFoodData, ScaledFoodData } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FormData {
    nama: string;
    jenkel: string;
    usia: string;
    beratBadan: string;
    tinggiBadan: string;
    tekananSistolik: string;
    tekananDiastolik: string;
    riwayatPenyakit: string;
    alergiMakanan: string;
    hipertensi: string;
}
type KlusterData = {
    nama: string;
    jenkel: string;
    usia: string;
    beratBadan: string;
    tinggiBadan: string;
    tekananSistolik: string;
    tekananDiastolik: string;
    riwayatPenyakit: string;
    alergiMakanan: string;
    hipertensi: string;
};

interface HypertensionClassification {
    type: string;
    color: string;
    bgColor: string;
}

export default function HealthDataView({ kluster }: { kluster: ScaledFoodData[] }) {
    const clusterNames = ['Pagi', 'Siang', 'Malam'];
    const dataMakanan: ResultFoodData[] = kluster.map((item) => {
        return { ...item, clusterResult: clusterNames[item.clusterResult?.cluster || 0] };
    });
    const {
        data: healthData,
        setData: setHealthData,
        get,
        errors,
        processing,
    } = useForm<KlusterData>({
        nama: 'ahmad',
        jenkel: 'Laki-laki',
        usia: '25',
        beratBadan: '60',
        tinggiBadan: '168',
        tekananSistolik: '120',
        tekananDiastolik: '85',
        riwayatPenyakit: 'Tidak ada',
        alergiMakanan: 'Tdak ada',
        hipertensi: '',
    });
    const [selectedData, setSelectedData] = useState<FormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadDataFromLocalStorage();
    }, []);

    const loadDataFromLocalStorage = () => {
        try {
            const savedData = localStorage.getItem('klusterData');

            if (savedData) {
                const parsedData: FormData = JSON.parse(savedData);
                setHealthData(parsedData);
            } else {
                setHealthData({
                    nama: 'ahmad',
                    jenkel: 'Laki-laki',
                    usia: '25',
                    beratBadan: '60',
                    tinggiBadan: '168',
                    tekananSistolik: '120',
                    tekananDiastolik: '85',
                    riwayatPenyakit: 'Tidak ada',
                    alergiMakanan: 'Tdak ada',
                    hipertensi: '',
                });
            }
        } catch (error) {
            console.error('Error parsing data from localStorage:', error);
            setHealthData({
                nama: 'ahmad',
                jenkel: 'Laki-laki',
                usia: '25',
                beratBadan: '60',
                tinggiBadan: '168',
                tekananSistolik: '120',
                tekananDiastolik: '85',
                riwayatPenyakit: 'Tidak ada',
                alergiMakanan: 'Tdak ada',
                hipertensi: '',
            });
        } finally {
            setIsLoading(false);
        }
    };

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
        <MainLayout>
            <Head title="Detail Data Kesehatan" />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
                <div className="container mx-auto max-w-6xl px-4">
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
                                        <p className="text-lg font-semibold">{healthData.nama}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Jenis Kelamin</h3>
                                        <p className="text-lg font-semibold">{healthData.jenkel}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Usia</h3>
                                        <p className="text-lg font-semibold">{healthData.usia} tahun</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Berat & Tinggi Badan</h3>
                                        <p className="text-lg font-semibold">
                                            {healthData.beratBadan} kg / {healthData.tinggiBadan} cm
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Tekanan Darah</h3>
                                        <p className="text-lg font-semibold">
                                            {healthData.tekananSistolik} / {healthData.tekananDiastolik} mmHg
                                        </p>
                                        {healthData.tekananSistolik && healthData.tekananDiastolik && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-medium ${
                                                    classifyHypertension(
                                                        parseInt(healthData.tekananSistolik) || 0,
                                                        parseInt(healthData.tekananDiastolik) || 0,
                                                    ).bgColor
                                                } ${
                                                    classifyHypertension(
                                                        parseInt(healthData.tekananSistolik) || 0,
                                                        parseInt(healthData.tekananDiastolik) || 0,
                                                    ).color
                                                }`}
                                            >
                                                {
                                                    classifyHypertension(
                                                        parseInt(healthData.tekananSistolik) || 0,
                                                        parseInt(healthData.tekananDiastolik) || 0,
                                                    ).type
                                                }
                                            </motion.span>
                                        )}
                                    </div>

                                    {healthData.beratBadan && healthData.tinggiBadan && (
                                        <div>
                                            <h3 className="mb-1 text-sm font-medium text-gray-500">Indeks Massa Tubuh (BMI)</h3>
                                            {calculateBMI(parseFloat(healthData.beratBadan) || 0, parseFloat(healthData.tinggiBadan) || 0) && (
                                                <>
                                                    <p className="text-lg font-semibold">
                                                        {
                                                            calculateBMI(
                                                                parseFloat(healthData.beratBadan) || 0,
                                                                parseFloat(healthData.tinggiBadan) || 0,
                                                            ).value
                                                        }
                                                    </p>
                                                    <p
                                                        className={
                                                            calculateBMI(
                                                                parseFloat(healthData.beratBadan) || 0,
                                                                parseFloat(healthData.tinggiBadan) || 0,
                                                            ).color
                                                        }
                                                    >
                                                        {
                                                            calculateBMI(
                                                                parseFloat(healthData.beratBadan) || 0,
                                                                parseFloat(healthData.tinggiBadan) || 0,
                                                            ).category
                                                        }
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Riwayat Penyakit</h3>
                                        <p className="text-lg font-semibold">{healthData.riwayatPenyakit || 'Tidak ada riwayat penyakit'}</p>
                                    </div>

                                    <div>
                                        <h3 className="mb-1 text-sm font-medium text-gray-500">Alergi Makanan</h3>
                                        <p className="text-lg font-semibold">{healthData.alergiMakanan || 'Tidak ada alergi makanan'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
                            <h3 className="mb-6 text-xl font-semibold text-gray-900">Tabel Data Makanan</h3>
                            <KlusterFood data={dataMakanan} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
