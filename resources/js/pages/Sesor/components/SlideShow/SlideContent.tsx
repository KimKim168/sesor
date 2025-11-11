import { usePage } from '@inertiajs/react';

const SlideContent = () => {
    const { campaignPromotion } = usePage<any>().props;

    const firstImage = campaignPromotion?.images?.[0]?.image;
    const imageSrc = firstImage ? `/assets/images/pages/${firstImage}` : '';

    return (
        <div className="grid w-full gap-4 lg:grid-cols-2">
            {imageSrc && (
                <img
                    src={imageSrc}
                    alt={campaignPromotion?.name || 'Campaign Promotion'}
                    className="aspect-video w-full object-cover"
                />
            )}

            <div className="text-primary">
                <h1 className="font-manrope-extra-bold text-[15px] leading-[1.2]! tracking-tighter">
                    {campaignPromotion?.name}
                </h1>

                {campaignPromotion?.long_description && (
                    <div
                        className="leading-[1.5] font-manrope-regular whitespace-pre-line text-primary prose-li:list-inside prose-li:list-disc"
                        dangerouslySetInnerHTML={{
                            __html: campaignPromotion.long_description,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default SlideContent;
