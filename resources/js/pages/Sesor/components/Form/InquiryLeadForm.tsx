import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';
import CheckBoxContact from './CheckBoxContact';
import useTranslation from '@/hooks/use-translation';

const InquiryLeadForm = () => {
    const { locale, inquiryLeadFormHeader } = usePage<any>().props;
    const {t} = useTranslation();
    const fontLabel = locale === 'kh' ? 'font-kantumruy font-semibold' : 'font-manrope-semi-bold';
    const [statusMessage, setStatusMessage] = useState<string | null>(null); // For showing success/error

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        contact_number: '',
        business_or_store_name: '',
        email: '',
        message: '',
        contact_method: '',
    });

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatusMessage(null); // Reset previous status

        post('/inquiry-lead-form', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setStatusMessage(locale === 'kh' ? 'ដាក់ស្នើបានជោគជ័យ!' : 'Submitted successfully!');
            },
            onError: () => {
                setStatusMessage(locale === 'kh' ? 'ការដាក់ស្នើបរាជ័យ!' : 'Failed to submit!');
            },
        });
    };

    return (
        <div id="inquiry-lead-form">
            <div className="section-container mt-10">
                <h2
                    className={`${locale === 'kh' ? 'font-kantumruy font-extrabold' : 'font-manrope-extra-bold'} text-2xl tracking-tight md:text-3xl`}
                >
                    {locale === 'kh' ? inquiryLeadFormHeader?.name_kh || inquiryLeadFormHeader?.name : inquiryLeadFormHeader?.name}
                </h2>
                <p className={`${fontLabel} mt-0.5 text-base sm:text-lg`}>{locale === 'kh' ? inquiryLeadFormHeader?.short_description_kh || inquiryLeadFormHeader?.short_description : inquiryLeadFormHeader?.short_description}</p>

                {/* {errors && <AllErrorsAlert title="Please fix the following errors" errors={errors} />} */}

                <div className="mt-7 grid gap-10 lg:grid-cols-2">
                    <Card className="border-none py-0 shadow-none">
                        <CardContent className="p-0">
                            <form onSubmit={submit} className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                                {/* Name */}
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="name" className={`${fontLabel} text-[16px] md:text-[18px]`}>
                                        {t('Name')}
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-0.5 h-10 border border-black bg-white shadow-none"
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                </div>

                                {/* Contact Number */}
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="contact_number" className={`${fontLabel} text-[16px] md:text-[18px]`}>
                                        {t('Contact Number')}
                                    </Label>
                                    <Input
                                        id="contact_number"
                                        value={data.contact_number}
                                        onChange={(e) => setData('contact_number', e.target.value)}
                                        className="mt-0.5 h-10 border border-black bg-white shadow-none"
                                    />
                                    {errors.contact_number && <p className="mt-1 text-sm text-red-500">{errors.contact_number}</p>}
                                </div>

                                {/* Business / Store Name */}
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="business_or_store_name" className={`${fontLabel} text-[16px] md:text-[18px]`}>
                                        {t('Business / Store Name')}
                                    </Label>
                                    <Input
                                        id="business_or_store_name"
                                        value={data.business_or_store_name}
                                        onChange={(e) => setData('business_or_store_name', e.target.value)}
                                        className="mt-0.5 h-10 border border-black bg-white shadow-none"
                                    />
                                    {errors.business_or_store_name && <p className="mt-1 text-sm text-red-500">{errors.business_or_store_name}</p>}
                                </div>

                                {/* Email */}
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="email" className={`${fontLabel} text-[16px] md:text-[18px]`}>
                                        {t('Email')}
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-0.5 h-10 border border-black bg-white shadow-none"
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                </div>

                                {/* Message */}
                                <div className="col-span-2">
                                    <Label htmlFor="message" className={`${fontLabel} text-[16px] md:text-[18px]`}>
                                        {t('Message (Optional)')}
                                    </Label>
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        rows={4}
                                        placeholder={locale === 'kh' ? 'សរសេរសាររបស់អ្នកនៅទីនេះ' : 'Write your message here...'}
                                        className="mt-0.5 w-full rounded-md border border-black bg-white p-2 text-base shadow-none focus-visible:outline-none"
                                    />
                                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                                </div>

                                {/* Preferred Contact Method */}
                                <div className="col-span-2">
                                    <p className={`${fontLabel} text-[16px] md:text-[18px]`}>
                                        {locale === 'kh'
                                            ? 'វិធីសាស្ត្រទំនាក់ទំនងដែលពេញចិត្ត (តម្រូវឱ្យជ្រើសរើសមួយ)'
                                            : 'Preferred Contact Method (Required to select one)'}
                                    </p>
                                    <div className="col-span-2 flex items-end justify-between">
                                        <div>
                                            <CheckBoxContact value={data.contact_method} onChange={(value) => setData('contact_method', value)} />
                                            {errors.contact_method && <p className="mt-1 text-sm text-red-500">{errors.contact_method}</p>}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className={`${locale === 'kh' ? 'font-kantumruy font-bold' : 'font-manrope-bold'} inline-flex h-9 w-[200px] shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-primary-two px-2 py-2 text-[13px] text-primary transition-all outline-none hover:-translate-y-[2px] hover:bg-primary-two md:text-[15px]`}
                                        >
                                            {locale === 'kh' ? 'ដាក់ស្នើ' : 'Submit'}
                                        </button>
                                    </div>

                                    {/* Status Message */}
                                    {statusMessage && (
                                        <div className="col-span-2 mt-3 text-center text-sm font-semibold text-primary">{statusMessage}</div>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Image */}
                    <div>
                        <img src={`/assets/images/pages/${inquiryLeadFormHeader?.images?.[0]?.image}`} alt={inquiryLeadFormHeader?.name} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InquiryLeadForm;
