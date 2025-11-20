import { usePage } from '@inertiajs/react';

const CardService = () => {
    const { ourServices, locale } = usePage<any>().props;

    // Font classes
    const fontTitleClass = locale === 'kh' ? 'font-bold' : 'font-manrope-extra-bold';
    const fontCardTitleClass = locale === 'kh' ? 'font-bold' : 'font-manrope-semi-bold';
    const fontCardDescClass = locale === 'kh' ? '' : 'font-manrope-regular';

    return (
        <div id="our-services" className="section-container mt-5 md:mt-10">
            <div className="text-center">
                {/* Section Title */}
                <h2 className={`text-xl text-primary md:text-3xl ${fontTitleClass}`}>
                    {locale === 'kh' ? ourServices?.name_kh || ourServices?.name : ourServices?.name}
                </h2>

                <div className="mt-2.5 grid gap-5 md:mt-5 md:grid-cols-2 md:gap-10 md:px-0 lg:grid-cols-3">
                    {/* Service Cards */}
                    {ourServices?.children?.map((item: any) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center rounded-[15px] bg-true-primary p-8 text-center"
                        >
                            <div className="flex aspect-square w-20 items-center justify-center text-primary md:w-28">
                                <img
                                    src={`/assets/images/pages/thumb/${item.icon}`}
                                    alt={locale === 'kh' ? item.name_kh || item.name : item.name}
                                />
                            </div>

                            {/* Card Title */}
                            <h3 className={`mt-1 text-[18px] text-white md:text-[22px] ${fontCardTitleClass}`}>
                                {locale === 'kh' ? item.name_kh || item.name : item.name}
                            </h3>

                            {/* Card Description */}
                            <p className={`mt-2 text-[13px] text-white md:text-[15px] ${fontCardDescClass}`}>
                                {locale === 'kh'
                                    ? item.short_description_kh || item.short_description
                                    : item.short_description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardService;
