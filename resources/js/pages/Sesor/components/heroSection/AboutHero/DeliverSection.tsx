import { usePage } from '@inertiajs/react';

const DeliverSection = () => {
    const { whoWeDeliverFor } = usePage<any>().props;
    return (
        <div id="who-we-deliver-for" className="flex items-center justify-center">
            <div className="section-container">
                <h2 className="mt-10 mb-5 text-center font-manrope-extra-bold text-3xl tracking-tight text-primary md:mt-15 md:mb-5">
                    {whoWeDeliverFor?.name}
                </h2>
                <div className="grid gap-8 md:gap-10 lg:grid-cols-2">
                    <div
                        className="flex flex-col space-y-4 font-manrope-extra-bold text-[18px] lg:text-[25px]"
                        dangerouslySetInnerHTML={{ __html: whoWeDeliverFor?.long_description }}
                    >
                    </div>
                    {/* Form */}
                    <div className="grid w-full place-items-center">
                        <img src={`/assets/images/pages/${whoWeDeliverFor?.images?.[0].image}`} alt={`Logo`} className=" object-contain " />
                    </div>
                    {/* <LogosCard /> */}
                </div>
            </div>
        </div>
    );
};

export default DeliverSection;
