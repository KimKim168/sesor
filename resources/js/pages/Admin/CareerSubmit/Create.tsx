import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import UploadedFile from '@/components/Form/UploadedFileDisplay';
import { FormField } from '@/components/Input/FormField';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface PageForm {
    name: string;

    career_id?: string;
    email?: string;

    phone_number?: string;

    file?: string;
}

export default function Create({ editData, readOnly }: { editData?: any; readOnly?: boolean}) {
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
        career_id: editData?.career?.position || '',
        email: editData?.email || '',
        phone_number: editData?.phone_number || '',
        file: editData?.file || '',
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
        { title: 'Career Submits', href: '/admin/career-submits' },
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
                        id="career_id"
                        name="career_id"
                        label="Position"
                        value={data.career_id}
                        onChange={(val) => setData('career_id', val)}
                        error={errors.career_id}
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
                        id="phone_number"
                        name="phone_number"
                        label="Phone Number"
                        value={data.phone_number || ''}
                        onChange={(val) => setData('phone_number', val)}
                        error={errors.phone_number}
                    />
                        {editData?.file && (
                            <UploadedFile
                                fileClassName="bg-background"
                                label="Attach CV"
                                permission="career_submit view"
                                files={[editData.file]} // must be an array
                                deletePath="/admin/career-submits/files/" // optional if you don't delete
                                basePath="/assets/files/career_submits/"
                                containerClassName="col-span-2 mt-0"
                            />
                        )}
                </div>

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
