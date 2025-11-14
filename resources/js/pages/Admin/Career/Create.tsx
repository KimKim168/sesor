import AlertFlashMessage from '@/components/Alert/AlertFlashMessage';
import AllErrorsAlert from '@/components/Alert/AllErrorsAlert';
import SubmitButton from '@/components/Button/SubmitButton';
import FormFileUpload from '@/components/Form/FormFileUpload';
import UploadedImage from '@/components/Form/UploadedImageDisplay';
import { FormField } from '@/components/Input/FormField';
import { FormFieldTextArea } from '@/components/Input/FormFieldTextArea';
import { FormLabel } from '@/components/Input/FormLabel';
import { ProgressWithValue } from '@/components/ProgressBar/progress-with-value';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useTranslation from '@/hooks/use-translation';
import AppLayout from '@/layouts/app-layout';
import MyCkeditor5 from '@/pages/plugins/ckeditor5/my-ckeditor5';
import { BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface PageForm {
    name: string;
    name_kh?: string;

    short_description?: string;
    short_description_kh?: string;

    long_description?: string;
    long_description_kh?: string;
    position?: string;
    position_kh?: string;

    image?: number;
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
        name_kh: editData?.name_kh || '',
        short_description: editData?.short_description || '',
        short_description_kh: editData?.short_description_kh || '',
        long_description: editData?.long_description || '',
        long_description_kh: editData?.long_description_kh || '',
        position: editData?.position || '',
        position_kh: editData?.position_kh || '',
        image: editData?.image || '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform(() => ({
            ...data,
            image: imageFiles ? imageFiles[0] : null, // single file
        }));

        if (editData?.id) {
            post(`/admin/careers/${editData.id}/update`, {
                onSuccess: (page: any) => {
                    setFiles(null);
                    setImageFiles(null);
                    setFlashMessage({ message: page.props.flash?.success, type: 'success' });
                },
            });
        } else {
            post('/admin/careers', {
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
        { title: 'Careers', href: '/admin/careers' },
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

                <div className="sticky top-0">
                    <Tabs value={inputLanguage} onValueChange={(val: any) => setInputLanguage(val)}>
                        <TabsList className="border bg-border/50 p-1 dark:border-white/20">
                            <TabsTrigger value="default" className="h-full dark:data-[state=active]:bg-white/20">
                                {t('Default')}
                            </TabsTrigger>
                            <TabsTrigger value="khmer" className="h-full dark:data-[state=active]:bg-white/20">
                                {t('Khmer')}
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {inputLanguage == 'khmer' ? (
                    <div className="form-field-container md:grid-cols-1">
                        <FormField
                            id="name_kh"
                            name="name_kh"
                            label="Name Khmer"
                            value={data.name_kh}
                            onChange={(val) => setData('name_kh', val)}
                            error={errors.name_kh}
                            containerClassName="col-span-2"
                        />

                        <FormFieldTextArea
                            id="short_description_kh"
                            name="short_description_kh"
                            label="Short Description Khmer"
                            value={data.short_description_kh}
                            onChange={(val) => setData('short_description_kh', val)}
                            error={errors.short_description_kh}
                            containerClassName="col-span-2"
                        />

                        <FormFieldTextArea
                            id="position_kh"
                            name="position_kh"
                            label="Position Khmer"
                            value={data.position_kh}
                            onChange={(val) => setData('position_kh', val)}
                            error={errors.position_kh}
                            containerClassName="col-span-2"
                        />

                        <div className="col-span-2 grid content-start gap-2">
                            <FormLabel label="Long Description Khmer" />
                            <MyCkeditor5 data={data.long_description_kh || ''} setData={(val: any) => setData('long_description_kh', val)} />
                        </div>
                    </div>
                ) : (
                    <div className="form-field-container">
                        <FormField
                            required
                            id="name"
                            name="name"
                            label="Name"
                            value={data.name}
                            onChange={(val) => setData('name', val)}
                            error={errors.name}
                            containerClassName="col-span-2"
                        />

                        <FormFieldTextArea
                            id="short_description"
                            name="short_description"
                            label="Short Description"
                            value={data.short_description}
                            onChange={(val) => setData('short_description', val)}
                            error={errors.short_description}
                            containerClassName="col-span-2"
                        />
                        <FormField
                            required
                            id="position"
                            name="position"
                            label="Position"
                            value={data.position}
                            onChange={(val) => setData('position', val)}
                            error={errors.position}
                            containerClassName="col-span-2"
                        />

                        <div className="col-span-2 grid content-start gap-2">
                            <FormLabel label="Long Description" />
                            <MyCkeditor5 data={data.long_description || ''} setData={(val: any) => setData('long_description', val)} />
                        </div>

                        <div className="col-span-2">
                            <Tabs defaultValue="icon" className="w-full rounded-lg bg-muted/80 p-4">
                                <div>
                                    <FormFileUpload
                                        dropzoneOptions={{
                                            maxFiles: 100,
                                            maxSize: 1024 * 1024 * 4,
                                            multiple: false,
                                            accept: {
                                                'image/jpeg': ['.jpeg', '.jpg'],
                                                'image/png': ['.png'],
                                                'image/gif': ['.gif'],
                                                'image/webp': ['.webp'],
                                            },
                                        }}
                                        key={editData?.image?.map((img: any) => img.image || img).join('-')}
                                        id="image"
                                        label="Image"
                                        files={imageFiles}
                                        setFiles={setImageFiles}
                                    />
                                    <UploadedImage
                                        label="Uploaded Images"
                                        permission="careers update"
                                        images={editData?.image}
                                        deletePath="/admin/careers/images/"
                                        basePath="/assets/images/careers/thumb/"
                                    />
                                </div>
                            </Tabs>
                        </div>
                    </div>
                )}

                {progress && <ProgressWithValue value={progress.percentage} position="start" />}

                {!readOnly && <SubmitButton processing={processing} />}
            </form>
        </AppLayout>
    );
}
