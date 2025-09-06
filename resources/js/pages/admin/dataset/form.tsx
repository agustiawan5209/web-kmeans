import InputError from '@/components/input-error';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IndikatorTypes } from '@/types';

export default function FormMakananView({
    data,
    errors,
    handleChange,
    handleSelectChange,
    indikator,
}: {
    data: any;
    errors: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSelectChange: (name: string, value: string) => void;
    indikator: IndikatorTypes[];
}) {
    return (
        <>
            {/* Informasi Dasar */}
            {/* Informasi Dasar */}

            {/* Parameter Nutrisi Rekomendasi Makanan */}
            <Card>
                <CardContent>
                    <CardHeader>
                        <CardTitle className="text-base md:text-xl">Indikator Dataset Makanan</CardTitle>
                    </CardHeader>
                    <CardDescription>
                        <div>
                            <Label className="text-xs text-gray-600">Nama Makanan</Label>
                            <Input
                                type="text"
                                name="label"
                                value={data.label}
                                onChange={handleChange}
                                className="placeholder:text-gray-400"
                                placeholder="masukkan label dari dataset"
                                required
                            />
                            {errors.label && <InputError message={errors.label} className="mt-2" />}
                        </div>
                        {indikator.length > 0 && (
                            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                {indikator.map((item: { nama: string; id: number }, index: number) => {
                                    return (
                                        <div key={index}>
                                            <Label className="text-xs text-gray-600">{item.nama}</Label>
                                            <Input
                                                type="number"
                                                step={0.1}
                                                name={`parameter.${index}`}
                                                value={data.parameter[index].nilai || ''}
                                                onChange={handleChange}
                                                className="placeholder:text-gray-400"
                                                placeholder={`masukkan ${item.nama}`}
                                                required
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardDescription>
                </CardContent>
            </Card>
        </>
    );
}
