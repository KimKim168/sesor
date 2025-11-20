import { usePage } from "@inertiajs/react";

const CardProhibitedWithRestricted = () => {
    const { prohibitedItems, restrictedItems, locale } = usePage<any>().props;

    const isKh = locale === "kh";

    return (
        <div id="prohibited-items" className="mt-10 bg-primary-two/30 py-5">
            {/* Prohibited Items */}
            <div className="section-container">
                <div className="text-center">
                    <h2
                        className={`text-primary text-3xl ${
                            isKh ? "font-bold" : "font-manrope-extra-bold"
                        }`}
                    >
                        {isKh
                            ? prohibitedItems?.[0]?.name_kh || prohibitedItems?.[0]?.name
                            : prohibitedItems?.[0]?.name}
                    </h2>

                    <div className="items-center mt-5 grid gap-5 md:grid-cols-2 justify-center md:gap-10 md:px-0 lg:grid-cols-4">
                        {prohibitedItems?.[0]?.children?.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex flex-col items-center md:p-4 text-center text-primary"
                            >
                                <div className="flex aspect-square w-[6.5rem] items-center justify-center">
                                    <img
                                        src={`/assets/images/pages/${item?.icon}`}
                                        alt={item?.name}
                                    />
                                </div>
                                <h3
                                    className={`mt-1 text-[15px] max-w-[200px] ${
                                        isKh
                                            ? ""
                                            : "font-manrope-regular"
                                    }`}
                                >
                                    {isKh
                                        ? item?.name_kh || item?.name
                                        : item?.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Restricted Items */}
            <div className="section-container mt-10">
                <div className="text-center">
                    <h2
                        className={`text-primary text-3xl ${
                            isKh ? "font-bold" : "font-manrope-extra-bold"
                        }`}
                    >
                        {isKh
                            ? restrictedItems?.[0]?.name_kh || restrictedItems?.[0]?.name
                            : restrictedItems?.[0]?.name}
                    </h2>

                    <div className="items-center mt-5 grid gap-5 md:grid-cols-2 md:gap-10 md:px-0 lg:grid-cols-4 xl:grid-cols-5">
                        {restrictedItems?.[0]?.children?.map((item: any) => (
                            <div
                                key={item.id}
                                className="flex flex-col items-center md:p-4 text-center text-primary"
                            >
                                <div className="flex aspect-square w-[6.5rem] items-center justify-center">
                                    <img
                                        src={`/assets/images/pages/${item?.icon}`}
                                        alt={item?.name}
                                    />
                                </div>
                                <h3
                                    className={`mt-1 text-[15px] max-w-[200px] ${
                                        isKh
                                            ? ""
                                            : "font-manrope-regular"
                                    }`}
                                >
                                    {isKh
                                        ? item?.name_kh || item?.name
                                        : item?.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProhibitedWithRestricted;
