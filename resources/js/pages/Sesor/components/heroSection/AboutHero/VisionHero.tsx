import { usePage } from '@inertiajs/react';

const VisionHero = () => {
    const { vision } = usePage<any>().props;

    return (
        <div id="vision-mission-core-values">
            {vision?.map((visionMain: any) => (
                <div key={visionMain.id}>
                    <h2 className="mt-10 mb-5 text-center font-manrope-extra-bold text-3xl tracking-tight text-primary md:mt-15 md:mb-5">
                        {visionMain?.name}
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
                                <div key={index} className="flex w-full flex-col lg:flex-row">
                                    
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
                                            <h2 className="font-manrope-extra-bold text-[25px] text-primary-two md:text-[40px]">
                                                Leading the future of delivery
                                            </h2>
                                            <p className="mt-2 font-manrope-regular text-[18px] leading-relaxed md:text-[27px]">
                                                — redefining technology, convenience, speed, and sustainability for people,
                                                businesses, and communities by providing trusted services.
                                            </p>
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
