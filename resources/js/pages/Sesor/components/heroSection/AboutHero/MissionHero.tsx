import { usePage } from '@inertiajs/react';

const MissionHero = () => {
    const { mission } = usePage<any>().props;
    return (
        <div id="vision-mission-core-values">
            {mission?.map((item:any) => (
                <div key={item.id}>
                    <h2 className="mt-10 mb-5 text-center font-manrope-extra-bold text-3xl tracking-tight text-primary md:mt-15 md:mb-5">
                        {item?.name}
                    </h2>
                    {item?.children?.map((subItem:any) => (
                        <div key={subItem.id} className="relative mx-auto w-full max-w-[2000px] overflow-hidden">
                            {/* Background */}
                            <img
                                src="/assets/sesor/about_us/3BgMission.png"
                                alt="Background"
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            {/* Content Grid */}
                            <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center">
                                {/* Left Content */}
                                <div className="flex flex-1 items-center justify-start px-4 pt-[16px] md:pt-8 lg:justify-center lg:pb-0">
                                    <div className="max-w-2xl text-white">
                                        <h2 className="font-manrope-extra-bold text-[25px] text-primary-two md:text-[40px]">{subItem?.name}</h2>
                                        <p className="mt-2 font-manrope-regular text-[18px] leading-relaxed md:text-[27px]">
                                            {subItem?.short_description}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Image */}
                                <div className="aspect-square lg:w-[500px]">
                                    <img
                                        src={`/assets/images/pages/${subItem?.images?.[0]?.image}`}
                                        alt="Vision"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MissionHero;
