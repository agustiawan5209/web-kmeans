import MainLayout from '@/layouts/guest/main-layout';
import { ResultFoodData, ScaledFoodData } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface KlusterViewProps {
    kluster: ScaledFoodData[];
}

type FormData = {
    nama: string;
    jenkel: string;
    usia: string;
    beratBadan: string;
    tinggiBadan: string;
    tekananSistolik: string;
    tekananDiastolik: string;
    riwayatPenyakit: string;
    alergiMakanan: string;
    hipertensi?: string;
    kluster?: {
        pagi: ResultFoodData[];
        siang: ResultFoodData[];
        malam: ResultFoodData[];
    };
};

interface HypertensionClassification {
    type: string;
    sistolik: string;
    diastolik: string;
    color: string;
}

const hypertensionClassifications: HypertensionClassification[] = [
    { type: 'Normal', sistolik: '<120', diastolik: '<80', color: 'bg-green-100 text-green-800' },
    { type: 'Prahipertensi', sistolik: '120-129', diastolik: '<80', color: 'bg-blue-100 text-blue-800' },
    { type: 'Hipertensi Tahap 1', sistolik: '130-139', diastolik: '80-89', color: 'bg-yellow-100 text-yellow-800' },
    { type: 'Hipertensi Tahap 2', sistolik: '≥140', diastolik: '≥90', color: 'bg-orange-100 text-orange-800' },
    { type: 'Hipertensi Krisis', sistolik: '≥180', diastolik: '≥120', color: 'bg-red-100 text-red-800' },
];

export default function KlusterView({ kluster }: KlusterViewProps) {
    const [sortField, setSortField] = useState<keyof ResultFoodData>('MENU');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    const clusterNames = ['Pagi', 'Siang', 'Malam'];
    const dataMakanan: ResultFoodData[] = kluster.map((item) => {
        return { ...item, clusterResult: clusterNames[item.clusterResult?.cluster || 0] };
    });
    // Memisahkan data berdasarkan cluster
    const pagiData = dataMakanan.filter((item) => item.clusterResult === 'Pagi');
    const siangData = dataMakanan.filter((item) => item.clusterResult === 'Siang');
    const malamData = dataMakanan.filter((item) => item.clusterResult === 'Malam');

    function shuffleArray(array: any) {
        let currentIndex = array.length,
            randomIndex;

        // Selama masih ada elemen untuk diacak.
        while (currentIndex != 0) {
            // Pilih elemen yang tersisa secara acak.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Dan tukar dengan elemen saat ini.
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const klusterResult = () => {
        const shuffledPagiData = shuffleArray(pagiData).slice(0, 5);
        const shuffledSiangData = shuffleArray(siangData).slice(0, 5);
        const shuffledMalamData = shuffleArray(malamData).slice(0, 5);
        return {
            pagi: shuffledPagiData,
            siang: shuffledSiangData,
            malam: shuffledMalamData,
        };
    };
    const {
        data: formData,
        setData: setFormData,
        post,
    } = useForm<FormData>({
        nama: '',
        jenkel: '',
        usia: '',
        beratBadan: '',
        tinggiBadan: '',
        tekananSistolik: '',
        tekananDiastolik: '',
        riwayatPenyakit: '',
        alergiMakanan: '',
        hipertensi: '',
        kluster: klusterResult(),
    });

    const [currentClassification, setCurrentClassification] = useState<HypertensionClassification | null>(null);
    const [showInstructions, setShowInstructions] = useState(false);

    useEffect(() => {
        classifyHypertension();
    }, [formData.tekananSistolik, formData.tekananDiastolik]);

    const classifyHypertension = () => {
        const sistolik = parseInt(formData.tekananSistolik) || 0;
        const diastolik = parseInt(formData.tekananDiastolik) || 0;

        if (sistolik >= 180 && diastolik >= 120) {
            setCurrentClassification(hypertensionClassifications[4]);
            setFormData((prevState) => ({ ...prevState, hipertensi: hypertensionClassifications[4].type }));
        } else if (sistolik >= 140 && diastolik >= 90) {
            setCurrentClassification(hypertensionClassifications[3]);
            setFormData((prevState) => ({ ...prevState, hipertensi: hypertensionClassifications[3].type }));
        } else if (sistolik >= 130 && diastolik >= 80) {
            setCurrentClassification(hypertensionClassifications[2]);
            setFormData((prevState) => ({ ...prevState, hipertensi: hypertensionClassifications[2].type }));
        } else if (sistolik >= 120 && diastolik < 80) {
            setCurrentClassification(hypertensionClassifications[1]);
            setFormData((prevState) => ({ ...prevState, hipertensi: hypertensionClassifications[1].type }));
        } else if (sistolik > 0 && diastolik > 0) {
            setCurrentClassification(hypertensionClassifications[0]);
            setFormData((prevState) => ({ ...prevState, hipertensi: hypertensionClassifications[0].type }));
        } else {
            setCurrentClassification(null);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);

        const storage = localStorage.setItem('klusterData', JSON.stringify(formData));
        post(route('riwayatPengguna.store'), {
            preserveState: true,
            replace: true,
        });
        // You can add your API call or further processing here
    };

    // Animasi varians untuk Framer Motion
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

    return (
        <MainLayout>
            <Head title={'Kluster Pengguna'} />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
                <div className="container mx-auto max-w-4xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 text-center"
                    >
                        <h1 className="mb-2 text-3xl font-bold text-gray-800">Form Data Kesehatan Pengguna</h1>
                        <p className="text-gray-600">Lengkapi data diri untuk analisis kesehatan yang lebih personal</p>

                        <button
                            onClick={() => setShowInstructions(!showInstructions)}
                            className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                            {showInstructions ? 'Sembunyikan' : 'Tampilkan'} Petunjuk Penggunaan
                        </button>
                    </motion.div>

                    {showInstructions && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mb-8 rounded-xl bg-white p-6 shadow-md"
                        >
                            <h2 className="mb-4 text-xl font-semibold text-gray-800">Cara Penggunaan</h2>
                            <ol className="list-decimal space-y-2 pl-5 text-gray-700">
                                <li>Isi semua field formulir dengan data yang diminta</li>
                                <li>Tekanan darah akan otomatis diklasifikasikan saat Anda mengisi field tekanan sistolik dan diastolik</li>
                                <li>Klasifikasi hipertensi akan muncul di bagian bawah form</li>
                                <li>Pastikan data yang dimasukkan akurat untuk hasil yang optimal</li>
                                <li>Klik tombol "Simpan Data" setelah semua field terisi</li>
                            </ol>
                        </motion.div>
                    )}

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="overflow-hidden rounded-xl bg-white shadow-lg"
                    >
                        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1"></div>

                        <form onSubmit={handleSubmit} className="p-6 md:p-8">
                            <motion.div variants={itemVariants} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Nama */}
                                <div>
                                    <label htmlFor="nama" className="mb-2 block text-sm font-medium text-gray-700">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        id="nama"
                                        name="nama"
                                        value={formData.nama}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                        placeholder="Masukkan nama lengkap"
                                    />
                                </div>

                                {/* Jenis Kelamin */}
                                <div>
                                    <label htmlFor="jenkel" className="mb-2 block text-sm font-medium text-gray-700">
                                        Jenis Kelamin
                                    </label>
                                    <select
                                        id="jenkel"
                                        name="jenkel"
                                        value={formData.jenkel}
                                        onChange={handleChange}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">Pilih Jenis Kelamin</option>
                                        <option value="Laki-laki">Laki-laki</option>
                                        <option value="Perempuan">Perempuan</option>
                                    </select>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                                {/* Usia */}
                                <div>
                                    <label htmlFor="usia" className="mb-2 block text-sm font-medium text-gray-700">
                                        Usia (tahun)
                                    </label>
                                    <input
                                        type="number"
                                        id="usia"
                                        name="usia"
                                        value={formData.usia}
                                        onChange={handleChange}
                                        min="0"
                                        max="120"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                        placeholder="Contoh: 25"
                                    />
                                </div>

                                {/* Berat Badan */}
                                <div>
                                    <label htmlFor="beratBadan" className="mb-2 block text-sm font-medium text-gray-700">
                                        Berat Badan (kg)
                                    </label>
                                    <input
                                        type="number"
                                        id="beratBadan"
                                        name="beratBadan"
                                        value={formData.beratBadan}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.1"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                        placeholder="Contoh: 65.5"
                                    />
                                </div>

                                {/* Tinggi Badan */}
                                <div>
                                    <label htmlFor="tinggiBadan" className="mb-2 block text-sm font-medium text-gray-700">
                                        Tinggi Badan (cm)
                                    </label>
                                    <input
                                        type="number"
                                        id="tinggiBadan"
                                        name="tinggiBadan"
                                        value={formData.tinggiBadan}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.1"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        required
                                        placeholder="Contoh: 170.5"
                                    />
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="mt-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-800">Tekanan Darah</h3>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <label htmlFor="tekananSistolik" className="mb-2 block text-sm font-medium text-gray-700">
                                            Tekanan Sistolik (mmHg)
                                        </label>
                                        <input
                                            type="number"
                                            id="tekananSistolik"
                                            name="tekananSistolik"
                                            value={formData.tekananSistolik}
                                            onChange={handleChange}
                                            min="0"
                                            max="300"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            required
                                            placeholder="Contoh: 120"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="tekananDiastolik" className="mb-2 block text-sm font-medium text-gray-700">
                                            Tekanan Diastolik (mmHg)
                                        </label>
                                        <input
                                            type="number"
                                            id="tekananDiastolik"
                                            name="tekananDiastolik"
                                            value={formData.tekananDiastolik}
                                            onChange={handleChange}
                                            min="0"
                                            max="200"
                                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                            required
                                            placeholder="Contoh: 80"
                                        />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div variants={itemVariants} className="mt-6">
                                {/* Riwayat Penyakit */}
                                <div className="mb-6">
                                    <label htmlFor="riwayatPenyakit" className="mb-2 block text-sm font-medium text-gray-700">
                                        Riwayat Penyakit
                                    </label>
                                    <textarea
                                        id="riwayatPenyakit"
                                        name="riwayatPenyakit"
                                        value={formData.riwayatPenyakit}
                                        onChange={handleChange}
                                        rows={3}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Jelaskan riwayat penyakit yang pernah Anda alami.
Tuliskan nama penyakit (misalnya: Diabetes tipe 2)
Sertakan tahun diagnosa (misalnya: 2018)"
                                    />
                                </div>

                                {/* Alergi Makanan */}
                                <div>
                                    <label htmlFor="alergiMakanan" className="mb-2 block text-sm font-medium text-gray-700">
                                        Alergi Makanan
                                    </label>
                                    <textarea
                                        id="alergiMakanan"
                                        name="alergiMakanan"
                                        value={formData.alergiMakanan}
                                        onChange={handleChange}
                                        rows={3}
                                        required
                                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                        placeholder="Sebutkan semua alergi makanan yang Anda miliki.
Nama makanan (contoh: Udang)
Gejala yang timbul (contoh: Gatal-gatal, sesak napas)
Tingkat keparahan (contoh: ringan, parah)"
                                    />
                                </div>
                            </motion.div>

                            {/* Klasifikasi Hipertensi */}
                            {currentClassification && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className={`mt-8 rounded-lg p-4 ${currentClassification.color} border-l-4 ${currentClassification.color.replace('bg-', 'border-')}`}
                                >
                                    <h3 className="mb-2 text-lg font-semibold">Klasifikasi Tekanan Darah</h3>
                                    <p>
                                        Tekanan darah Anda dikategorikan sebagai: <span className="font-bold">{currentClassification.type}</span>
                                    </p>
                                    <p className="mt-1 text-sm">
                                        Sistolik: {currentClassification.sistolik} mmHg, Diastolik: {currentClassification.diastolik} mmHg
                                    </p>
                                </motion.div>
                            )}

                            {/* Tabel Klasifikasi Hipertensi */}
                            <motion.div variants={itemVariants} className="mt-8 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
                                <h3 className="border-b bg-gray-50 p-3 font-semibold text-gray-800">Tabel Klasifikasi Hipertensi</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead className="bg-gray-100">
                                            <tr>
                                                <th className="p-3 text-left">Jenis Hipertensi</th>
                                                <th className="p-3 text-center">Tekanan Sistolik (mmHg)</th>
                                                <th className="p-3 text-center">Tekanan Diastolik (mmHg)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {hypertensionClassifications.map((classification, index) => (
                                                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                    <td className="p-3 font-medium">{classification.type}</td>
                                                    <td className="p-3 text-center">{classification.sistolik}</td>
                                                    <td className="p-3 text-center">{classification.diastolik}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>

                            {/* Submit Button */}
                            <motion.div variants={itemVariants} className="pt-8">
                                <button
                                    type="submit"
                                    className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-white shadow-md transition duration-200 hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Simpan Data
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 text-center text-sm text-gray-600"
                    >
                        <p>© 2023 Health Monitoring System. Data Anda akan dijaga kerahasiaannya.</p>
                    </motion.div>
                </div>
            </div>
        </MainLayout>
    );
}
