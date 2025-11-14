import { usePage } from '@inertiajs/react';

const VisionHero = () => {
    const { vision, locale } = usePage<any>().props;
    const fontClassTitle =
        locale === 'kh' ? 'font-kantumruy font-bold' : 'font-manrope-extra-bold';
    const fontClassText =
        locale === 'kh' ? 'font-kantumruy' : 'font-manrope-regular';

    return (
        <div id="vision-mission-core-values">
            {vision?.map((visionMain: any) => (
                <div key={visionMain.id}>
                    {/* Vision Main Title */}
                    <h2
                        className={`mt-10 mb-5 text-center text-3xl tracking-tight text-primary md:mt-15 md:mb-5 ${fontClassTitle}`}
                    >
                        {locale === 'kh'
                            ? visionMain?.name_kh || visionMain?.name
                            : visionMain?.name}
                    </h2>

                    <div className="relative mx-auto w-full max-w-[2000px] overflow-hidden">
                        {/* Background */}
                        <img
                            src="/assets/sesor/about_us/2BgVision.png"
                            alt="Background"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        {/* Content Grid */}
                        <div className="relative flex flex-col items-center gap-4 lg:flex-row">
                            {visionMain?.children?.map((subItem: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex w-full flex-col lg:flex-row"
                                >
                                    {/* Left Image */}
                                    <div className="aspect-square lg:w-[500px]">
                                        <img
                                            src={`/assets/images/pages/${subItem?.images?.[0]?.image}`}
                                            alt="Vision"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    {/* Right Content */}
                                    <div className="section-container flex flex-1 items-center justify-center pb-4 md:pb-8 lg:pb-0">
                                        <div className="max-w-2xl text-white">
                                            <h2
                                                className={`text-[25px] text-primary-two md:text-[40px] ${fontClassTitle}`}
                                            >
                                                {locale === 'kh'
                                                    ? subItem?.name_kh || subItem?.name
                                                    : subItem?.name}
                                            </h2>
                                            <p
                                                className={`mt-2 text-[18px] leading-relaxed md:text-[27px] ${fontClassText}`}
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        locale === 'kh'
                                                            ? subItem?.short_description_kh ||
                                                              subItem?.short_description
                                                            : subItem?.short_description,
                                                }}
                                            ></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default VisionHero;
