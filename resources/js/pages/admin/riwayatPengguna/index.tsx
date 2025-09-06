import { DeleteConfirmationForm } from '@/components/delete-confirmation-form';
import PaginationTable from '@/components/pagination-table';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { EyeIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
interface RiwayatViewProps {
    riwayatPengguna: {
        current_page: number;
        data: {
            id: number;
            user: { name: string; email: string };
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
        }[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        next_page_url?: string;
        path: string;
        per_page: number;
        prev_page_url: string;
        to: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    breadcrumb?: BreadcrumbItem[];
    titlePage?: string;
}

export default function RiwayatView({ riwayatPengguna, breadcrumb, titlePage }: RiwayatViewProps) {
    const breadcrumbs: BreadcrumbItem[] = useMemo(
        () => (breadcrumb ? breadcrumb.map((item) => ({ title: item.title, href: item.href })) : []),
        [breadcrumb],
    );

    const [isDeleteDialog, setisDeleteDialog] = useState(false);
    console.log(riwayatPengguna.data[0]);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={titlePage ?? 'Riwayat Pengguna'} />

            {/* Data */}
            <Card>
                <div className="container mx-auto px-4">
                    <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <h2 className="text-lg font-bold md:text-xl">Data Riwayat Rekomendasi Pengguna</h2>
                    </div>
                    <div className="overflow-x-auto rounded-md border">
                        <Table className="min-w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="cursor-pointer">no</TableHead>
                                    <TableHead className="cursor-pointer">nama</TableHead>
                                    <TableHead className="cursor-pointer">jenis kelamin</TableHead>
                                    <TableHead className="cursor-pointer">usia</TableHead>
                                    <TableHead className="cursor-pointer">Tekanan Darah</TableHead>
                                    <TableHead className="cursor-pointer">jenis Hipertensi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {riwayatPengguna.data && riwayatPengguna.data.length ? (
                                    riwayatPengguna.data.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.nama}</TableCell>
                                            <TableCell>{item.jenkel}</TableCell>
                                            <TableCell>{item.usia}</TableCell>
                                            <TableCell>
                                                {item.tekanan_sistolik} / {item.tekanan_diastolik} mmHg
                                            </TableCell>
                                            <TableCell>{item.hipertensi}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-row items-center gap-2">
                                                    <DeleteConfirmationForm
                                                        title={`Hapus riwayatPengguna ${item.id}`}
                                                        id={item.id}
                                                        url={route('admin.riwayatPengguna.destroy', { riwayatPengguna: item.id })}
                                                        setOpenDialog={setisDeleteDialog}
                                                    />
                                                    <Link href={route('admin.riwayatPengguna.show', { riwayatPengguna: item.id })}>
                                                        <Button variant={'default'} type="button" className="bg-chart-1">
                                                            <EyeIcon size={4} />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="py-4 text-center">
                                            No data found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <PaginationTable links={riwayatPengguna.links} data={riwayatPengguna} />
                    </div>
                </div>
            </Card>
        </AppLayout>
    );
}
