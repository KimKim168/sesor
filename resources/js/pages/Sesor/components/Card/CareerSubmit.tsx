import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Loader from '../Bottons/Loader';
import useTranslation from '@/hooks/use-translation';

const CareerSubmit = ({ item }: { item: any }) => {
    const { locale } = usePage<any>().props;
    const { t } = useTranslation();
    const fontLabel = locale === 'kh' ? 'font-kantumruy' : 'font-manrope-regular';

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        career_id: item.id,
        email: '',
        phone_number: '',
        file: null as File | null,
    });

    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatusMessage(null);

        if (!data.file) {
            alert(locale === 'kh' ? 'សូមភ្ជាប់ CV របស់អ្នកមុន!' : 'Please attach your CV first!');
            return;
        }

        setLoading(true);

        post('/career-submits', {
            forceFormData: true, // important for file upload
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setStatusMessage(locale === 'kh' ? 'ដាក់ស្នើបានជោគជ័យ!' : 'Submitted successfully!');
                setLoading(false);
                setSuccess(true);
                setTimeout(() => setSuccess(false), 3000);
            },
            onError: () => {
                setStatusMessage(locale === 'kh' ? 'ការដាក់ស្នើបរាជ័យ!' : 'Failed to submit!');
                setLoading(false);
            },
        });
    };

    return (
        <div className="flex flex-1 flex-col gap-4">
            <Card className="border-none bg-transparent py-0 shadow-none">
                <CardContent className="bg-none p-0">
                    <form onSubmit={handleSubmit} className="grid gap-x-8 gap-y-3">
                        {/* Name */}
                        <div className="col-span-2">
                            <Label className={`${fontLabel} text-[20px] text-white`} htmlFor="name">
                                {locale === 'kh' ? 'ឈ្មោះ' : 'Name'}
                            </Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-0.5 h-10 rounded-md bg-white shadow-none"
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>

                        {/* Position (Career) */}
                        <div className="col-span-2">
                            <Label className={`${fontLabel} text-[20px] text-white`} htmlFor="career_id">
                                {t('Position')}
                            </Label>
                            <Input id="career_id" value={item.position || ''} readOnly className="mt-0.5 h-10 rounded-md bg-white shadow-none" />
                            {errors.career_id && <p className="mt-1 text-sm text-red-500">{errors.career_id}</p>}
                        </div>

                        {/* Email */}
                        <div className="col-span-2">
                            <Label className={`${fontLabel} text-[20px] text-white`} htmlFor="email">
                                {locale === 'kh' ? 'អ៊ីមែល' : 'Email'}
                            </Label>
                            <Input
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-0.5 h-10 rounded-md bg-white shadow-none"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        {/* Phone Number */}
                        <div className="col-span-2">
                            <Label className={`${fontLabel} text-[20px] text-white`} htmlFor="phone_number">
                                {t('Phone Number')}
                            </Label>
                            <Input
                                id="phone_number"
                                value={data.phone_number}
                                onChange={(e) => setData('phone_number', e.target.value)}
                                className="mt-0.5 h-10 rounded-md bg-white shadow-none"
                            />
                            {errors.phone_number && <p className="mt-1 text-sm text-red-500">{errors.phone_number}</p>}
                        </div>

                        <div className="flex items-center gap-2">
                            {/* File Upload */}
                            <div className="col-span-2 mt-4 flex flex-col items-center">
                                <label
                                    htmlFor="file"
                                    className="min-w-[150px] cursor-pointer rounded-full bg-white px-4 py-1.5 text-center font-manrope-regular text-primary hover:bg-gray-200"
                                >
                                    {data.file ? data.file.name : t('Attach CV')}
                                </label>

                                <Input type="file" id="file" onChange={(e) => setData('file', e.target.files?.[0] || null)} className="hidden" />

                                {errors.file && <p className="mt-2 text-sm text-red-500">{errors.file}</p>}
                            </div>
                            {/* Submit Button */}
                            <div className="col-span-2 mt-4 flex justify-center">
                                <Button
                                    type="submit"
                                    disabled={loading || processing}
                                    className="rounded-full bg-white px-8 py-2 font-manrope-regular text-primary hover:bg-gray-200 disabled:opacity-50"
                                >
                                    {loading || processing ? <Loader /> : locale === 'kh' ? 'ដាក់ស្នើ' : 'Submit'}
                                </Button>
                            </div>
                        </div>

                        {/* Status Message */}
                        {statusMessage && <div className="col-span-2 mt-3 text-center text-sm font-semibold text-white">{statusMessage}</div>}

                        {/* Success Message */}
                        {success && (
                            <div className="col-span-2 mt-1 text-center font-manrope-semi-bold text-green-500">
                                {locale === 'kh' ? 'ដាក់ស្នើបានជោគជ័យ!' : 'Application submitted successfully!'}
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CareerSubmit;
