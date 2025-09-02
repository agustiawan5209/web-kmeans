import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, IndikatorTypes } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import FormMakananView from './form';

type Dataset = {
    label: string;
    parameter: {
        indikator_id: number;
        nilai: string | null;
    }[];
};

const opsiGejala = [
    { label: 'daun menguning', value: 0 },
    { label: 'pertumbuhan lambat', value: 1 },
    { label: 'ujung daun mengering', value: 2 },
    { label: 'daun sehat', value: 3 },
    { label: 'batang rapuh', value: 4 },
    { label: 'daun menggulung', value: 5 },
];

interface PropsDatasetView {
    breadcrumb: BreadcrumbItem[];
    indikator: IndikatorTypes[];
    titlePage?: string;
}
const daftarBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

const opsiKejernihan = ['Sangat Jernih', 'Jernih', 'Agak Keruh', 'Keruh', 'Sangat Keruh'];
const opsiCahaya = ['Sangat Cerah', 'Cerah', 'Berawan', 'Mendung', 'Gelap'];
const opsiArus = ['Sangat Kuat', 'Kuat', 'Siang', 'Lemah', 'Sangat Lemah'];
const opsiNutrisi = ['Melimpah', 'Cukup', 'Terbatas', 'Sangat Sedikit'];

export default function FormDatasetView({ breadcrumb, indikator, titlePage }: PropsDatasetView) {
    const breadcrumbs: BreadcrumbItem[] = breadcrumb ? breadcrumb.map((item) => ({ title: item.title, href: item.href })) : [];
    const { data, setData, post, processing, errors } = useForm<Dataset>({
        label: '',
        parameter: indikator.map((_, index) => ({
            indikator_id: indikator[index].id,
            nilai: null,
        })),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        const key = name.split('.')[1];
        if (name.includes('parameter')) {
            setData((prevData) => ({
                ...prevData,
                parameter: prevData.parameter.map((item, index) => {
                    if (index === Number(key)) {
                        return {
                            ...item,
                            nilai: value,
                        };
                    }
                    return item;
                }),
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    const handleSelectChange = (name: string, value: string) => {
        if (name && value !== undefined && data && data.parameter) {
            if (name === 'label' || name === 'jenis_tanaman' || name == 'bulan') {
                setData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setData((prevData) => ({
                    ...prevData,
                    parameter: prevData.parameter.map((item, index) => {
                        if (index === Number(name)) {
                            return {
                                ...item,
                                nilai: value,
                            };
                        } else {
                            return item;
                        }
                    }),
                }));
            }
        } else {
            console.error('Invalid data: name, value, or parameter may be undefined');
        }
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Tambahkan logika submit di sini
        post(route('admin.hasilMakanan.store'), {
            onError: (err) => {
                console.log(err);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={titlePage ?? 'Input Dataset Makanan'} />
            <div className="mx-auto max-w-7xl rounded-xl border border-gray-100 bg-white p-6 shadow">
                <h1 className="mb-6 text-center text-xl font-semibold text-primary">Input Dataset Makanan</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <FormMakananView
                        data={data}
                        errors={errors}
                        indikator={indikator}
                        handleChange={handleChange}
                        handleSelectChange={handleSelectChange}
                    />
                    <div className="flex justify-end">
                        <Button type="submit" variant={'default'}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Simpan Data
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
