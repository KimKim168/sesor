import { usePage } from '@inertiajs/react';
import ButtonSimple from '../../Bottons/ButtonSimple';

const Hero02 = () => {
    const { secondHero, locale } = usePage<any>().props;

    // Dynamic font based on language
    const fontTitleClass =
        locale === 'kh' ? 'font-kantumruy font-extrabold' : 'font-manrope-extra-bold';

    const fontDescClass =
        locale === 'kh' ? 'font-kantumruy' : 'font-manrope-regular';

    return (
        <div
            id="track-trace"
            className="section-container mt-[16px] grid items-center justify-between gap-5 md:mt-10 md:gap-10 lg:grid-cols-2"
        >
            <div>
                {/*  Translate name */}
                <h1
                    className={`max-w-[17ch] text-4xl leading-[1.2]! tracking-tighter text-primary md:text-[85px] ${fontTitleClass}`}
                >
                    {locale === 'kh'
                        ? secondHero?.name_kh || secondHero?.name
                        : secondHero?.name}
                </h1>

                {/*  Translate short description */}
                <p className={`max-w-[60ch] text-[13px] sm:text-[15px] ${fontDescClass}`}>
                    {locale === 'kh'
                        ? secondHero?.short_description_kh || secondHero?.short_description
                        : secondHero?.short_description}
                </p>

                {/*  Translate button title */}
                <div className="mt-10 flex items-center gap-4">
                    <ButtonSimple
                        title={
                            locale === 'kh'
                                ? secondHero?.button_title_kh || secondHero?.button_title
                                : secondHero?.button_title
                        }
                        link={secondHero?.link}
                        targetBlank={true}
                    />
                </div>
            </div>

            {/* Image */}
            <img
                src={`/assets/images/pages/${secondHero?.images?.[0].image}`}
                className="w-full rounded-xl"
            />
        </div>
    );
};

export default Hero02;
