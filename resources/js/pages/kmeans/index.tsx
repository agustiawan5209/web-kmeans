import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import KMeansClustering from '@/utils/kmeans';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

interface FpGrowthViewProps {
    breadcrumb: BreadcrumbItem[];
    titlePage: string;
    transaksiMakanan?: string[][];
    transactionNumerical?: string[][];
    kriteria: {
        id: number;
        nama: string;
    }[];
}
// Type for association rules
interface AssociationRule {
    antecedent: string[];
    consequent: string;
    confidence: number; // percentage
    support: number; // percentage
}

interface ClusterResult {
    clusters: {
        pagi: string[][];
        siang: string[][];
        malam: string[][];
    };
    centroids: number[][];
    associations: {
        item: string;
        influence: number;
    }[];
    featureImportance: {
        item: string;
        importance: number;
        clusterVariances: {
            pagi: number;
            siang: number;
            malam: number;
        };
    }[];
    uniqueItems: string[];
}
export default function FpGrowthView({ breadcrumb, titlePage, transaksiMakanan, transactionNumerical, kriteria }: FpGrowthViewProps) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => (breadcrumb ? breadcrumb.map((item) => ({ title: item.title, href: item.href })) : []),
        [breadcrumb],
    );
    const [kMeans, setKMeans] = useState<ClusterResult>({
        clusters: { pagi: [], siang: [], malam: [] },
        centroids: [],
        associations: [],
        featureImportance: [],
        uniqueItems: [],
    });

    // Menyimpan hasil kluster dari k-means
    const [resultCluster, setResultCluster] = useState<{ pagi: string[][]; siang: string[][]; malam: string[][] }>({
        pagi: [],
        siang: [],
        malam: [],
    });
    // data transaksi dengan 2 dimensi
    const transactions: string[][] = transaksiMakanan || [];
    const clustering = new KMeansClustering(transactions);
    // const { clusters, featureImportance, associations, uniqueItems } = useKMeansClustering(transactionsNumeric);

    const runKmeans = () => {
        const result = clustering.run();
        if (result) {
            setResultCluster(result.clusters);
            const objindikator: {
                pagi: string[][];
                siang: string[][];
                malam: string[][];
            } = Object.values(result.clusters).reduce(
                (acc, item: any, key) => {
                    let indikator = 'hasil_dataset';

                    if (key === 0) {
                        indikator = 'hasil_dataset_pagi';
                    } else if (key === 1) {
                        indikator = 'hasil_dataset_siang';
                    } else if (key === 2) {
                        indikator = 'hasil_dataset_malam';
                    }

                    const result = item;

                    // Menyimpan hasil ke dalam objek akumulator berdasarkan indikator
                    if (key === 0) {
                        acc.pagi = result;
                    } else if (key === 1) {
                        acc.siang = result;
                    } else if (key === 2) {
                        acc.malam = result;
                    }

                    return acc;
                },
                { pagi: [], siang: [], malam: [] },
            ); // Inisialisasi objek akumulator

            setKMeans({
                clusters: objindikator,
                centroids: result.centroids,
                featureImportance: result.featureImportance,
                associations: result.associations,
                uniqueItems: result.uniqueItems,
            });
        }
    };
    // Tentukan nilai support dan confidence threshold
    // Support: Seberapa sering itemset muncul (0.3 = 30% dari total transaksi)
    // Confidence: Seberapa sering aturan terbukti benar
    const [associationMalam, setAssociationMalam] = useState<{ name: string; count: number }[]>([]);
    const [selectedIndikator, setSelectedIndikator] = useState<{ name: string; count: number }[]>([]);

    const [isSaved, setIsSaved] = useState<boolean>(false);

    return (
        <>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title={titlePage} />

                <div className="K-means-container rounded-lg bg-white p-4 shadow-lg">
                    <div className="grid grid-cols-2">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">Jalankan Algoritma K-means</h2>
                            <div className="mt-2 text-sm text-gray-600">
                                <p className="font-medium text-yellow-600">
                                    Peringatan: Proses ini mungkin memakan waktu lama jika data transaksi sangat besar
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center"></div>
                    </div>
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <Button
                            onClick={runKmeans}
                            type="button"
                            variant={'default'}
                            className={`rounded-md px-4 py-2 font-medium text-white transition-colors`}
                        >
                            {'Jalankan K-means'}
                        </Button>
                    </div>

                    <section className="space-y-8 rounded-xl bg-white p-6 shadow-sm">
                        <div className="space-y-8">
                            <h2 className="text-2xl font-semibold text-gray-800">Hasil Clustering K-means</h2>

                            <div className="grid gap-6 md:grid-cols-3">
                                {/* Cluster Pagi */}
                                <div className="cluster-card rounded-lg border border-blue-100 bg-blue-50 p-4">
                                    <h3 className="mb-3 text-lg font-medium text-blue-800">
                                        Cluster Pagi <span className="text-blue-600">({kMeans.clusters.pagi.length} transaksi)</span>
                                    </h3>
                                    {/* <TransactionList transactions={kMeans.clusters.pagi.slice(0, 5)} total={kMeans.clusters.pagi.length} /> */}
                                </div>

                                {/* Cluster Siang */}
                                <div className="cluster-card rounded-lg border border-purple-100 bg-purple-50 p-4">
                                    <h3 className="mb-3 text-lg font-medium text-purple-800">
                                        Cluster Siang <span className="text-purple-600">({kMeans.clusters.siang.length} transaksi)</span>
                                    </h3>
                                    {/* <TransactionList transactions={kMeans.clusters.siang.slice(0, 5)} total={kMeans.clusters.siang.length} /> */}
                                </div>

                                {/* Cluster Malam */}
                                <div className="cluster-card rounded-lg border border-green-100 bg-green-50 p-4">
                                    <h3 className="mb-3 text-lg font-medium text-green-800">
                                        Cluster Malam <span className="text-green-600">({kMeans.clusters.malam.length} transaksi)</span>
                                    </h3>
                                    {/* <TransactionList transactions={kMeans.clusters.malam.slice(0, 5)} total={kMeans.clusters.malam.length} /> */}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </AppLayout>
        </>
    );
}
