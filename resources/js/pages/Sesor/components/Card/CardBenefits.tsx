import { usePage } from "@inertiajs/react";

const CardBenefits = () => {
    const { benefits } = usePage<any>().props;
    const [benefit] = benefits ?? [];

    return (
        <div id="benefits" className="section-container mt-5 md:mt-10">
            <div className="text-center">
                <h2 className="font-manrope-extra-bold text-3xl tracking-tight text-primary">
                    {benefit?.name}
                </h2>

                <div className="mt-2.5 grid gap-2 md:mt-5 md:grid-cols-2 md:gap-2 md:px-0 lg:grid-cols-5">
                    {benefit?.children?.map((item: any) => (
                        <div
                            key={item.id}
                            className="flex flex-col items-center rounded-[8px] bg-primary px-8 py-4 text-center"
                        >
                            <div className="flex aspect-square w-16 items-center justify-center text-primary">
                                <img
                                    src={item.icon ? `/assets/images/pages/${item.icon}` : "/assets/images/default.png"}
                                    alt={item.icon || "Benefit Image"}
                                />
                            </div>

                            <h3 className="mt-1 font-manrope-extra-bold text-[15px] text-white">
                                {item.name}
                            </h3>

                            <p className="mt-1 font-manrope-regular text-[9px] text-white">
                                {item.short_description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardBenefits;
