import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, FoodData } from '@/types';
import { Head } from '@inertiajs/react';
import { useMemo } from 'react';
import KMeansClustering from './kmeansClustering';

interface KmeansViewProps {
    breadcrumb: BreadcrumbItem[];
    titlePage: string;
    transaksiMakanan: FoodData[];
    kriteria: {
        id: number;
        nama: string;
    }[];
}

export default function KmeansView({ breadcrumb, titlePage, transaksiMakanan, kriteria }: KmeansViewProps) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => (breadcrumb ? breadcrumb.map((item) => ({ title: item.title, href: item.href })) : []),
        [breadcrumb],
    );
    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={titlePage} />

                <div className="K-means-container rounded-lg bg-white p-4 shadow-lg">
                    <KMeansClustering foodData={transaksiMakanan} />
                </div>
            </AppLayout>
        </>
    );
}
