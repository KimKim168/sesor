import { usePage } from '@inertiajs/react';
import ButtonSimple from '../../Bottons/ButtonSimple';

const Hero02 = () => {
    const { secondHero } = usePage<any>().props;
    return (
        <div id="track-trace" className="section-container mt-[16px] grid items-center justify-between gap-5 md:mt-10 md:gap-10 lg:grid-cols-2">
            <div>
                <h1 className="max-w-[17ch] font-manrope-extra-bold text-4xl leading-[1.2]! tracking-tighter text-primary md:text-[85px]">
                    {secondHero?.name}
                </h1>
                <p className="max-w-[60ch] font-manrope-regular text-[13px] sm:text-[15px]">{secondHero?.short_description}</p>
                <div className="mt-10 flex items-center gap-4">
                    <ButtonSimple title={secondHero?.button_title} link={secondHero?.link} targetBlank={true} />
                </div>
            </div>
            <img src={`/assets/images/pages/${secondHero?.images?.[0].image}`} className="w-full rounded-xl" />
        </div>
    );
};

export default Hero02;
