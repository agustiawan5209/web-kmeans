import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, DatasetTypes, IndikatorTypes } from '@/types';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num);
};

const capitalize = (str: string) => {
    return str.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
};

const getWaterQualityColor = (ph: number) => {
    if (ph < 6.5) return 'bg-red-100 text-red-800';
    if (ph < 7.5) return 'bg-green-100 text-green-800';
    return 'bg-yellow-100 text-yellow-800';
};

interface HarvestDetailProps {
    dataset: DatasetTypes;
    breadcrumb: BreadcrumbItem[];
    indikator: IndikatorTypes[];
    titlePage: string;
}

interface ParameterTypes {
    indikator_id: number | string;
    nilai: number | string;
}
export default function HarvestDetailPage({ dataset, breadcrumb, indikator, titlePage }: HarvestDetailProps) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => (breadcrumb ? breadcrumb.map((item) => ({ title: item.title, href: item.href })) : []),
        [breadcrumb],
    );
    const [data] = useState<DatasetTypes>(dataset);
    const jenisRumputLaut: Array<{ nama: string; jumlah: number }> = data.jenisRumputLaut as Array<{ nama: string; jumlah: number }>;
    const parameter: ParameterTypes[] = dataset.parameter
        ? dataset.parameter.map((item) => ({
              indikator_id: item.indikator_id,
              nilai: item.nilai ?? '', // add a default value if nilai is null
          }))
        : [];
    const findNameParameter = (value: number | string) => {
        return indikator.filter((item) => item.id == Number(value))[0].nama;
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={titlePage ?? 'Detail'} />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="min-h-screen bg-gray-50">
                <div className="mx-auto max-w-7xl">

                    {/* Detailed Parameters */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mb-10 overflow-hidden rounded-xl bg-white shadow-md"
                    >
                        <div className="border-b border-gray-200 px-6 py-5">
                            <h3 className="text-lg font-medium text-gray-900">Parameter Lingkungan</h3>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <div className="overflow-hidden border-l-4 border-chart-4 bg-white p-6 shadow-md">
                                <h3 className="text-sm font-medium text-gray-500">Detail Tanaman</h3>
                                <div className="mt-4 grid grid-cols-3 gap-7 space-y-3">
                                    {parameter.map((item, index) => (
                                        <div key={index} className="flex flex-col justify-between border-b-2">
                                            <span className="text-base font-medium text-gray-800">{findNameParameter(item.indikator_id)}</span>
                                            <span className="text-base font-light">{item.nilai}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visualization Placeholder */}
                    {/* <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="mb-10 overflow-hidden rounded-xl bg-white p-6 shadow-md"
                    >
                        <h3 className="mb-4 text-lg font-medium text-gray-900">Visualisasi Data</h3>
                        <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
                            <p className="text-gray-500">Grafik produksi akan ditampilkan di sini</p>
                        </div>
                    </motion.div> */}

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="text-center text-sm text-gray-500"
                    >
                        <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}
