import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { PopupDialog } from '../Dialogs/PopupDialog';
import useTranslation from '@/hooks/use-translation';

const CareerPost = () => {
    const { career, locale } = usePage().props;
    const {t} = useTranslation();
    // Ensure exactly 4 cards
    const cards = Array.from({ length: 4 }, (_, idx) => career?.[idx] || null);

    return (
        <div>
            <h2 id="career" className="mt-7.5 mb-3.5 text-center font-manrope-extra-bold text-3xl tracking-tight text-primary md:mt-15 md:mb-5">
                {t("Career")}
            </h2>

            <div className="grid border-2 border-primary bg-gray-100 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((item, index) =>
                    item ? (
                        <Card key={index} className="gap-1 overflow-hidden rounded-none border-none bg-primary py-0 shadow-none">
                            <CardHeader className="p-0">
                                <img src={`/assets/images/careers/${item.image}`} className="aspect-square w-full" />
                            </CardHeader>
                            <CardContent className="px-3 pb-4">
                                <h3
                                    className={`${
                                        locale === 'kh' ? 'font-kantumruy font-semibold' : 'font-manrope-semi-bold'
                                    } mt-2 text-[16px] text-primary-two`}
                                >
                                    {locale === 'kh' ? item.name_kh || item.name : item.name}
                                </h3>

                                <p
                                    className={`${
                                        locale === 'kh' ? 'font-kantumruy text-[12px] font-extralight' : 'font-manrope-extra-light text-[13px]'
                                    } text-white`}
                                >
                                    {locale === 'kh' ? item.short_description_kh || item.short_description : item.short_description}
                                </p>

                                <PopupDialog item={item} locale={locale} titleButton={t("More Details")} />
                            </CardContent>
                        </Card>
                    ) : (
                        <div
                            key={`placeholder-${index}`}
                            className="flex h-full items-center border-primary/20 border justify-center bg-gray-100 text-center text-xl font-manrope-extra-bold text-gray-400"
                        >
                            Coming Soon
                        </div>
                    ),
                )}
            </div>
        </div>
    );
};

export default CareerPost;
