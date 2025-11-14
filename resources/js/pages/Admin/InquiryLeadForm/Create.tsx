import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import FormFileUpload from '@/components/Form/FormFileUpload';
import UploadedImage from '@/components/Form/UploadedImageDisplay';
import { FormCombobox } from '@/components/Input/FormCombobox';
import { FormField } from '@/components/Input/FormField';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { FormLabel } from '@/components/Input/FormLabel';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { cn, toSlug } from '@/lib/utils';
import MyCkeditor5 from '@/pages/plugins/ckeditor5/my-ckeditor5';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface PageForm {
    name: string;

    contact_number?: string;

    business_or_store_name?: string;
    email?: string;

    message?: string;
    contact_method?: string;
}

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean }) {
    const [flashMessage, setFlashMessage] = useState<{ message: string; type: string }>({
        message: '',
        type: 'message',
    });

    const [inputLanguage, setInputLanguage] = useState<'default' | 'khmer'>('default');

    const { types, parents, selected_page_code } = usePage<any>().props;

    const [files, setFiles] = useState<File[] | null>(null);
    const [imageFiles, setImageFiles] = useState<File[] | null>(null);

    const { data, setData, post, processing, transform, progress, errors, reset } = useForm<PageForm>({
        name: editData?.name || '',
        contact_number: editData?.contact_number || '',
        business_or_store_name: editData?.business_or_store_name || '',
        email: editData?.email || '',
        message: editData?.message || '',
        contact_method: editData?.contact_method || '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform(() => ({ ...data, icon: files ? files[0] : null, images: imageFiles || null }));

        if (editData?.id) {
            post(`/admin/pages/${editData.id}/update`, {
                onSuccess: (page: any) => {
                    setFiles(null);
                    setImageFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        } else {
            post('/admin/inquiry-lead-form', {
                onSuccess: (page: any) => {
                    reset();
                    setFiles(null);
                    setImageFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Inquiry Lead Form', href: '/admin/inquiry-lead-form' },
        { title: editData?.name || 'Create', href: '#' },
    ];

    const { t, currentLocale } = useTranslation();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={onSubmit} className="form">
                <AlertFlashMessage
                    key={flashMessage.message}
                    type={flashMessage.type}
                    flashMessage={flashMessage.message}
                    setFlashMessage={setFlashMessage}
                />
                {errors && <AllErrorsAlert title="Please fix the following errors" errors={errors} />}

                 <div className="form-field-container">

                        <FormField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            value={data.name}
                            onChange={(val) => setData('name', val)}
                            error={errors.name}
                        />

                        <FormField
                            id="contact_number"
                            name="contact_number"
                            label="Contact Number"
                            value={data.contact_number}
                            onChange={(val) => setData('contact_number', val)}
                            error={errors.contact_number}
                        />

                        <FormField
                            id="business_or_store_name"
                            name="business_or_store_name"
                            label="Business / Store Name"
                            value={data.business_or_store_name || ''}
                            onChange={(val) => setData('business_or_store_name', val)}
                            error={errors.business_or_store_name}
                        />

                        <FormField
                            id="email"
                            name="email"
                            label="Email"
                            value={data.email || ''}
                            onChange={(val) => setData('email', val)}
                            error={errors.email}
                        />
                        <FormField
                            id="contact_method"
                            name="contact_method"
                            label="Contact Method"
                            value={data.contact_method || ''}
                            onChange={(val) => setData('contact_method', val)}
                            error={errors.contact_method}
                        />
                        <FormFieldTextArea
                            id="message"
                            name="message"
                            label="Message"
                            value={data.message}
                            onChange={(val) => setData('message', val)}
                            error={errors.message}
                            containerClassName="col-span-2"
                        />
                    </div>

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
