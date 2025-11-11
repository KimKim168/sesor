import { usePage } from '@inertiajs/react';

const CardDeliver = () => {
    const { whatWeDeliver } = usePage<any>().props;

    const children = whatWeDeliver?.[0]?.children ?? [];

    return (
        <div id="what-we-deliver" className="section-container mt-10">
            <div className="text-center">
                <h2 className="font-manrope-extra-bold text-3xl tracking-tight text-primary">
                    {whatWeDeliver?.[0]?.name}
                </h2>

                <div className="mt-5 grid gap-5 md:grid-cols-2 md:gap-10 md:px-0 lg:grid-cols-3">
                    {children.map((item: any) => (
                        <div key={item.id} className="flex flex-col items-center text-center text-primary">
                            <div className="flex aspect-[16/6] w-full items-center justify-center text-primary">
                                <img
                                    src={`/assets/images/pages/${item.images?.[0]?.image}`}
                                    alt={item.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <h3 className="mt-1.5 font-manrope-semi-bold text-[22px]">
                                {item.name}
                            </h3>

                            <p className="mt-1 max-w-[300px] font-manrope-regular text-[15px]">
                                {item.short_description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardDeliver;
