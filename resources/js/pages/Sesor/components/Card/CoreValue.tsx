import { usePage } from '@inertiajs/react';

const CoreValue = () => {
    const { coreValues } = usePage<any>().props;

    // Default colors array
    const defaultColors = [
        "bg-true-primary",
        "bg-primary-two",
        "bg-[#66499C]",
        "bg-[#93288D]",
        "bg-[#E7278D]",
    ];

    return (
        <div id="vision-mission-core-values" className="flex flex-col items-center justify-center">
            {coreValues?.map((item: any) => (
                <div key={item.id} className="text-center w-full">
                    <h2 className="mt-10 mb-5 text-center font-manrope-extra-bold text-3xl tracking-tight text-primary md:mt-15 md:mb-5">
                        {item?.name}
                    </h2>

                    <div className="section-container grid justify-between gap-6 md:grid-cols-2 md:gap-8 md:px-0 lg:grid-cols-3 xl:grid-cols-5">
                        {item?.children?.map((subItem: any, index: number) => {
                            // Use backend color if provided, otherwise cycle default colors
                            const bgColor = subItem.colorClass ?? defaultColors[index % defaultColors.length];

                            return (
                                <div
                                    key={subItem.id}
                                    className={`flex flex-col items-center text-center font-medium ${bgColor.replace(
                                        "bg-",
                                        "text-"
                                    )}`} // text color matches bg
                                >
                                    {/* Image */}
                                    <div className="flex aspect-square w-20 items-center justify-center text-primary">
                                        <img src={`/assets/images/pages/${subItem?.icon}`} alt={subItem?.name} />
                                    </div>

                                    {/* Color bar */}
                                    <div className={`my-2 h-5 w-[200px] ${bgColor}`} />

                                    {/* Title */}
                                    <h3 className="font-manrope-semi-bold text-[22px]">
                                        {subItem?.name ?? "Default Title"}
                                    </h3>

                                    {/* Description */}
                                    <p className="mt-0.5 font-manrope-regular text-[14px]">
                                        {subItem?.short_description ?? "No description available."}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CoreValue;
