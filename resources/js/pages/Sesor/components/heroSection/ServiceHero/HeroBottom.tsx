import { usePage } from '@inertiajs/react';
import ButtonSimple from '../../Bottons/ButtonSimple';

const HeroBottom = () => {
    const { chargesRates } = usePage<any>().props;
    return (
        <div
            id="charges-rates"
            className="relative mt-10 w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/sesor/main_page/BgFaq.png')" }}
        >
            <div className="section-container">
                <div className="grid min-h-[450px] grid-cols-1 items-center md:grid-cols-2 md:gap-10">
                    {/* Left Content */}
                    <div className="flex flex-col py-6 text-start text-white md:py-12 md:text-left">
                        {/* Logo + Title */}
                        <p className="font-manrope-semi-bold text-[40px] text-primary-two">{chargesRates?.name}</p>

                        <h2 className="font-manrope-semi-bold text-[25px] leading-snug">{chargesRates?.short_description}</h2>

                        {/* Button at the End */}
                        <div className="mt-6 md:mt-30">
                            <ButtonSimple title={chargesRates?.button_title} link={chargesRates?.link} targetBlank={true}/>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="mb-6 flex items-center justify-center self-center md:mb-0 md:justify-end">
                        <img
                            src={`/assets/images/pages/${chargesRates?.images?.[0]?.image}`}
                            alt={chargesRates?.name}
                            className="h-auto w-full max-w-lg rounded-2xl drop-shadow-2xl sm:w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroBottom;
