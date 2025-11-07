import { usePage } from '@inertiajs/react';
import ButtonSimple from '../../Bottons/ButtonSimple';

const Hero04 = () => {
    const { backgroundFourth, fourthHero } = usePage<any>().props;
    return (
        <div
            className="relative mt-5 w-full bg-cover bg-center md:mt-10"
            style={{
                backgroundImage: `url('/assets/images/banners/${backgroundFourth?.image}')`,
            }}
        >
            <div className="section-container">
                <div className="grid min-h-[450px] grid-cols-1 items-center md:grid-cols-3 md:gap-10">
                    {/* Left Content */}
                    <div className="col-span-2">
                        <div className="flex flex-col py-[16px] text-start font-manrope-semi-bold text-white md:py-12 md:text-left">
                            {/* Logo + Title */}
                            <h2 className="text-[25px] leading-snug md:text-[40px]">{fourthHero?.name}</h2>
                            <p className="text-[25px] text-primary-two md:text-[40px]">{fourthHero?.short_description}</p>

                            {/* Button at the End */}
                            <div className="mt-6 md:mt-30">
                                <ButtonSimple title={fourthHero?.button_title} link={fourthHero?.link} targetBlank={false} />
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
