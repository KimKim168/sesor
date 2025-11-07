import { useState } from 'react';
import ButtonWithArrow from '../../Bottons/ButtonWithArrow';
import FAQSDetail from './FAQSDetail';
import { usePage } from '@inertiajs/react';

const FAQS = () => {
    const [showFAQ, setShowFAQ] = useState(false);
    const { backgroundFifth, fifthHero, faqs } = usePage<any>().props;
    return (
        <div id="faqs">
            <div className="relative mt-5 w-full bg-cover bg-center md:mt-10" style={{
                backgroundImage: `url('/assets/images/banners/${backgroundFifth?.image}')`,
            }}>
                <div className="section-container">
                    <div className="grid min-h-[450px] grid-cols-1 items-center gap-5 md:grid-cols-2 md:gap-10">
                        {/* Left Content */}
                        <div className="flex flex-col py-[16px] text-start font-manrope-semi-bold text-white md:py-12 md:text-left">
                            <p className="text-[25px] text-primary-two md:text-[40px]">{fifthHero?.name}</p>
                            <h2 className="text-[18px] leading-snug md:text-[25px]">
                                {fifthHero?.short_description}
                            </h2>

                            <div className="mt-6 md:mt-30">
                                <div onClick={() => setShowFAQ((prev) => !prev)}>
                                    <ButtonWithArrow title={fifthHero?.button_title} />
                                </div>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="flex justify-center self-end md:justify-end">
                            <img
                                src={`/assets/images/pages/${fifthHero?.images?.[0].image}`}
                                alt="Phone Mockup"
                                className="h-auto w-2/3 max-w-lg drop-shadow-2xl sm:w-2/3"
                            />
                        </div>
                    </div>
                    {/* FAQ Detail inside main content */}
                </div>
            </div>
            {showFAQ && <FAQSDetail faqs={faqs}/>}
        </div>
    );  
};

export default FAQS;
