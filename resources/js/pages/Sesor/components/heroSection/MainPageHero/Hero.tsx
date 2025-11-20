import { usePage } from '@inertiajs/react';
import QRCard from '../QRCard';

const Hero = () => {
    const { backgroundSecond, firstHero, playStoreAndroid, appStoreIOS, locale } = usePage<any>().props;

    const fontTitleClass = locale === 'kh'
        ? 'font-bold'
        : 'font-manrope-extra-bold';

    const fontDescClass = locale === 'kh'
        ? ''
        : 'font-manrope-medium';

    return (
        <div
            id="download-apps"
            className="relative mt-5 w-full bg-cover bg-center md:mt-10"
            style={{
                backgroundImage: `url('/assets/sesor/main_page/hero.png')`,
            }}
        >
            <div className="section-container">
                <div className="grid min-h-[450px] grid-cols-1 items-center md:grid-cols-2 md:gap-10">

                    {/* Left Content */}
                    <div className="flex flex-col justify-center py-[16px] text-white md:py-12 md:text-left">

                        {/* Logo + Title */}
                        <div className="mb-1.5 flex items-center justify-start gap-3 md:mb-3">
                            <img
                                src={`/assets/images/pages/thumb/${firstHero?.icon}`}
                                alt="SESOR Logo"
                                className="aspect-square w-12 rounded-xl object-cover md:w-14"
                            />
                            <h2 className={`text-[18px] md:text-[20px] ${fontTitleClass}`}>
                                {locale === 'kh'
                                    ? (firstHero?.name_kh ?? firstHero?.name)
                                    : firstHero?.name}
                            </h2>
                        </div>

                        {/* Description */}
                        <p className={`${fontDescClass} text-[18px] md:text-[20px]`}>
                            {locale === 'kh'
                                ? firstHero?.short_description_kh || firstHero?.short_description
                                : firstHero?.short_description}
                        </p>

                        {/* QR + Store Buttons */}
                        <div className="mt-4 grid grid-cols-1 gap-4 md:mt-8 lg:grid-cols-2 xl:gap-14">

                            {/* Google Play */}
                            <div className="flex justify-center gap-2 md:justify-start">
                                {playStoreAndroid?.map((item: any) =>
                                    item?.links?.map((subItem: any) => (
                                        <QRCard
                                            key={subItem.id}
                                            title={locale === 'kh' ? subItem?.name_kh || subItem?.name : subItem?.name}
                                            qr={`/assets/images/links/thumb/${subItem?.image}`}
                                            store={`/assets/images/types/${item?.image}`}
                                            link={subItem?.link}
                                        />
                                    ))
                                )}
                            </div>

                            {/* App Store */}
                            <div className="flex justify-center gap-2 md:justify-start">
                                {appStoreIOS?.map((item: any) =>
                                    item?.links?.map((subItem: any) => (
                                        <QRCard
                                            key={subItem.id}
                                            title={locale === 'kh' ? subItem?.name_kh || subItem?.name : subItem?.name}
                                            qr={`/assets/images/links/thumb/${subItem?.image}`}
                                            store={`/assets/images/types/${item?.image}`}
                                            link={subItem?.link}
                                        />
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center self-end md:justify-end">
                        <img
                            src={`/assets/images/pages/${firstHero?.images?.[0].image}`}
                            alt="Phone Mockup"
                            className="h-auto w-2/3 max-w-lg sm:w-1/2 md:w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
