import { usePage } from '@inertiajs/react';

const CardService = () => {
    const { ourServices } = usePage<any>().props;

    return (
        <div id="our-services" className="section-container mt-5 md:mt-10">
            <div className="text-center">
                <h2 className="font-manrope-extra-bold text-xl text-primary md:text-3xl">{ourServices?.name}</h2>

                <div className="mt-2.5 grid gap-5 font-manrope-semi-bold md:mt-5 md:grid-cols-2 md:gap-10 md:px-0 lg:grid-cols-3">
                    {/* Card 1 */}
                    {ourServices?.children?.map((item: any) => (
                        <div key={item.id} className="flex flex-col items-center rounded-[15px] bg-true-primary p-8 text-center">
                            <div className="flex aspect-square w-20 items-center justify-center text-primary md:w-28">
                                <img
                                    src={`/assets/images/pages/thumb/${item.icon}`} 
                                    alt={item.name}
                                />
                            </div>
                            <h3 className="mt-1 font-manrope-semi-bold text-[18px] text-white md:text-[22px]">{item.name}</h3>
                            <p className="mt-2 font-manrope-regular text-[13px] text-white md:text-[15px]">{item.short_description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardService;
