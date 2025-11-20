import { usePage } from '@inertiajs/react';
import ButtonSimple from '../../Bottons/ButtonSimple';

const Hero04 = () => {
    const { backgroundFourth, fourthHero, locale } = usePage<any>().props;

    // Font classes
    const fontTitleClass = locale === 'kh' ? ' font-bold' : 'font-manrope-semi-bold';
    const fontDescClass = locale === 'kh' ? 'font-bold' : 'font-manrope-semi-bold';

    return (
        <div
            className="relative mt-5 w-full bg-cover bg-center md:mt-10"
            style={{
                backgroundImage: `url('/assets/sesor/main_page/BgHero4.png')`,
            }}
        >
            <div className="section-container">
                <div className="grid min-h-[450px] grid-cols-1 items-center md:grid-cols-3 md:gap-10">
                    {/* Left Content */}
                    <div className="col-span-2">
                        <div className="flex flex-col py-[16px] text-start text-white md:py-12 md:text-left">
                            {/* Title */}
                            <h2 className={`text-[25px] md:text-[40px] ${fontTitleClass}`}>
                                {locale === 'kh' ? fourthHero?.name_kh || fourthHero?.name : fourthHero?.name}
                            </h2>

                            {/* Description */}
                            <p className={`text-[25px] text-primary-two md:text-[40px] ${fontDescClass}`}>
                                {locale === 'kh'
                                    ? fourthHero?.short_description_kh || fourthHero?.short_description
                                    : fourthHero?.short_description}
                            </p>

                            {/* Button */}
                            <div className="mt-6 md:mt-30">
                                <ButtonSimple
                                    title={
                                        locale === 'kh'
                                            ? fourthHero?.button_title_kh || fourthHero?.button_title
                                            : fourthHero?.button_title
                                    }
                                    link={fourthHero?.link}
                                    targetBlank={false}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="flex justify-center self-end md:justify-end">
                        <img
                            src={`/assets/images/pages/${fourthHero?.images?.[0].image}`}
                            alt="Phone Mockup"
                            className="h-auto w-2/2 max-w-lg drop-shadow-2xl sm:w-2/2 md:w-2/1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero04;
