import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import MainLayout from '@/layouts/guest/main-layout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Activity, Apple, BarChart3, Calculator, Clock, Heart, Salad, Scale, Search, Shield, Users } from 'lucide-react';
import React from 'react';

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const fadeInUp = {
        initial: { opacity: 0, y: 60 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    return (
        <MainLayout>
            <Head title="Sistem Rekomendasi Makanan Sehat untuk Hipertensi" />

            {/* Hero Section */}
            <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-50 pt-16">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-600/10" />
                <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 text-center sm:px-6 lg:px-8">
                    <motion.div className="mx-auto max-w-4xl" variants={staggerContainer} initial="initial" animate="animate">
                        <motion.div variants={fadeInUp}>
                            <Badge className="mb-6 border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-200">
                                <Heart className="mr-2 h-4 w-4" />
                                Kesehatan Jantung
                            </Badge>
                        </motion.div>
                        <motion.h1 variants={fadeInUp} className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-6xl">
                            Sistem Rekomendasi
                            <span className="text-blue-600"> Makanan Sehat</span>
                        </motion.h1>
                        <motion.p variants={fadeInUp} className="mb-8 text-xl leading-relaxed text-gray-600 md:text-2xl">
                            Khusus untuk <span className="font-semibold text-blue-700">Penderita Hipertensi</span> Berdasarkan{' '}
                            <span className="font-semibold text-blue-700">Kebutuhan Nutrisi</span>
                        </motion.p>
                        <motion.p variants={fadeInUp} className="mx-auto mb-10 max-w-2xl text-lg text-gray-500">
                            Manfaatkan algoritma K-means clustering untuk mendapatkan rekomendasi makanan yang tepat sesuai kondisi kesehatan Anda,
                            membantu mengontrol tekanan darah dan meningkatkan kualitas hidup.
                        </motion.p>
                        <motion.div variants={fadeInUp} className="flex flex-col justify-center gap-4 sm:flex-row">
                            <Link href={route('login')}>
                                <Button size="lg" className="bg-blue-600 px-8 py-3 text-white hover:bg-blue-700">
                                    Dapatkan Rekomendasi
                                    <Apple className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Button variant="outline" size="lg" className="border-blue-200 px-8 py-3 text-blue-700 hover:bg-blue-50">
                                Pelajari Lebih Lanjut
                                <Search className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Floating illustration */}
                <motion.div
                    animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform opacity-5"
                >
                    <Heart className="h-96 w-96 text-blue-600" />
                </motion.div>
            </section>

            {/* About Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white py-20"
                id="about"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Tentang Sistem</h2>
                        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                            Sistem rekomendasi kami menggunakan algoritma K-means clustering untuk menganalisis kebutuhan nutrisi penderita hipertensi
                            dan memberikan rekomendasi makanan yang tepat untuk membantu mengontrol tekanan darah dan menjaga kesehatan jantung.
                        </p>
                    </motion.div>

                    <div className="grid items-center gap-12 md:grid-cols-2">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-blue-100 p-8 shadow-lg transition-shadow hover:shadow-xl">
                                <div className="mb-6 flex items-center">
                                    <div className="mr-4 rounded-lg bg-blue-100 p-3">
                                        <Scale className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">Kontrol Natrium</h3>
                                        <p className="text-blue-600">Manajemen Garam</p>
                                    </div>
                                </div>
                                <p className="leading-relaxed text-gray-600">
                                    Sistem kami membantu mengontrol asupan natrium dengan merekomendasikan makanan rendah garam yang tetap lezat dan
                                    bergizi untuk menjaga tekanan darah tetap stabil.
                                </p>
                            </Card>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            <Card className="border-blue-100 p-8 shadow-lg transition-shadow hover:shadow-xl">
                                <div className="mb-6 flex items-center">
                                    <div className="mr-4 rounded-lg bg-blue-100 p-3">
                                        <Activity className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900">Nutrisi Seimbang</h3>
                                        <p className="text-blue-600">Kebutuhan Gizi</p>
                                    </div>
                                </div>
                                <p className="leading-relaxed text-gray-600">
                                    Algoritma kami memastikan rekomendasi makanan memenuhi kebutuhan nutrisi harian Anda dengan fokus pada kalium,
                                    magnesium, serat, dan nutrisi penting lainnya untuk kesehatan jantung.
                                </p>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 py-20"
                id="features"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Fitur Utama</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Solusi komprehensif untuk membantu mengelola hipertensi melalui pola makan yang sehat
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                    >
                        <motion.div variants={fadeInUp}>
                            <Card className="border-0 bg-white p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-4"
                                >
                                    <Apple className="h-8 w-8 text-blue-600" />
                                </motion.div>
                                <h3 className="mb-3 text-lg font-semibold text-gray-900">Rekomendasi Personal</h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Rekomendasi makanan yang disesuaikan dengan kondisi kesehatan dan preferensi pribadi Anda
                                </p>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Card className="border-0 bg-white p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 p-4"
                                >
                                    <Calculator className="h-8 w-8 text-blue-600" />
                                </motion.div>
                                <h3 className="mb-3 text-lg font-semibold text-gray-900">Analisis Nutrisi</h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Analisis mendetail kandungan nutrisi setiap makanan yang direkomendasikan
                                </p>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Card className="border-0 bg-white p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 p-4"
                                >
                                    <BarChart3 className="h-8 w-8 text-purple-600" />
                                </motion.div>
                                <h3 className="mb-3 text-lg font-semibold text-gray-900">Monitoring Progress</h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Pantau perkembangan kesehatan dan pola makan Anda secara berkala
                                </p>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInUp}>
                            <Card className="border-0 bg-white p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 p-4"
                                >
                                    <Users className="h-8 w-8 text-orange-600" />
                                </motion.div>
                                <h3 className="mb-3 text-lg font-semibold text-gray-900">Dukungan Komunitas</h3>
                                <p className="text-sm leading-relaxed text-gray-600">
                                    Terhubung dengan komunitas penderita hipertensi untuk berbagi pengalaman
                                </p>
                            </Card>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* How It Works */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-blue-50 py-20"
                id="how-it-works"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Cara Kerja</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Langkah sederhana untuk mendapatkan rekomendasi makanan sehat yang tepat
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
                    >
                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white"
                                >
                                    1
                                </motion.div>
                                <Activity className="absolute -top-2 -right-2 h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">Input Data Kesehatan</h3>
                            <p className="text-sm leading-relaxed text-gray-600">
                                Masukkan data tekanan darah, berat badan, tinggi badan, dan kondisi kesehatan
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white"
                                >
                                    2
                                </motion.div>
                                <Calculator className="absolute -top-2 -right-2 h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">Analisis Kebutuhan</h3>
                            <p className="text-sm leading-relaxed text-gray-600">
                                Sistem menganalisis kebutuhan nutrisi dan batasan diet berdasarkan kondisi Anda
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-2xl font-bold text-white"
                                >
                                    3
                                </motion.div>
                                <Search className="absolute -top-2 -right-2 h-8 w-8 text-purple-400" />
                            </div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">Clustering dengan K-means</h3>
                            <p className="text-sm leading-relaxed text-gray-600">
                                Algoritma K-means mengelompokkan makanan sesuai dengan profil nutrisi yang dibutuhkan
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="text-center">
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.1 }}
                                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-2xl font-bold text-white"
                                >
                                    4
                                </motion.div>
                                <Salad className="absolute -top-2 -right-2 h-8 w-8 text-orange-400" />
                            </div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">Rekomendasi Makanan</h3>
                            <p className="text-sm leading-relaxed text-gray-600">
                                Dapatkan rekomendasi makanan sehat yang sesuai dengan kebutuhan dan preferensi Anda
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Benefits Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-white py-20"
                id="benefits"
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Manfaat untuk Kesehatan</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">Mengapa penting mengatur pola makan untuk penderita hipertensi</p>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                <Shield className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">Kontrol Tekanan Darah</h3>
                            <p className="text-sm leading-relaxed text-gray-600">
                                Membantu menjaga tekanan darah tetap stabil melalui pola makan yang terkontrol dan seimbang
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                                <Heart className="h-8 w-8 text-blue-600" />
                            </div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">Kesehatan Jantung</h3>
                            <p className="text-sm leading-relaxed text-gray-600">
                                Meningkatkan kesehatan jantung dengan mengurangi risiko komplikasi kardiovaskular
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                                <Clock className="h-8 w-8 text-purple-600" />
                            </div>
                            <h3 className="mb-3 text-lg font-semibold text-gray-900">Kualitas Hidup</h3>
                            <p className="text-sm leading-relaxed text-gray-600">
                                Meningkatkan kualitas hidup dengan energi yang lebih baik dan kesehatan secara keseluruhan
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-blue-600 to-blue-600 py-20"
                id="cta"
            >
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Mulai Perjalanan Sehat Anda Hari Ini</h2>
                        <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100">
                            Dapatkan rekomendasi makanan personal yang membantu mengontrol hipertensi dan meningkatkan kualitas hidup Anda
                        </p>
                        <Link href={route('login')}>
                            <Button size="lg" className="bg-white px-8 py-3 text-blue-600 hover:bg-gray-100">
                                Dapatkan Rekomendasi Sekarang
                                <Apple className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </motion.section>
        </MainLayout>
    );
};

export default Home;
