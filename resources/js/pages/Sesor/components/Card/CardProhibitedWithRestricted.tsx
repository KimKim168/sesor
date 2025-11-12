import { usePage } from "@inertiajs/react";

const CardProhibitedWithRestricted = () => {
   const { prohibitedItems, restrictedItems } = usePage<any>().props;
  return (
     <div id="prohibited-items" className="mt-10 bg-primary-two/30 py-5">
    {/* Prohibited Items */}
   <div className="section-container">
      <div className="text-center">
        <h2 className="font-manrope-extra-bold tracking-tight text-primary text-3xl">
          {prohibitedItems[0]?.name}
        </h2>

        <div className="items-center mt-5 grid gap-5 md:grid-cols-2 justify-center md:gap-10 md:px-0 lg:grid-cols-4">
          {prohibitedItems[0]?.children?.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col items-center md:p-4 text-center text-primary"
            >
              <div className="flex aspect-square w-[6.5rem] items-center justify-center">
                <img
                  src={`/assets/images/pages/${item?.icon}`} // <-- use real icon from DB
                  alt={item?.name}
                />
              </div>
              <h3 className="mt-1 text-[15px] max-w-[200px] font-manrope-regular">
                {item?.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Restricted Items */}
   <div className="section-container mt-10">
      <div className="text-center">
        <h2 className="font-manrope-extra-bold tracking-tight text-primary text-3xl">
          {restrictedItems[0]?.name}
        </h2>

        <div className="items-center mt-5 grid gap-5 md:grid-cols-2 md:gap-10 md:px-0 lg:grid-cols-4 xl:grid-cols-5">
          {restrictedItems[0]?.children?.map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col items-center md:p-4 text-center text-primary"
            >
              <div className="flex aspect-square w-[6.5rem] items-center justify-center">
                {/* Dynamically render icon from DB */}
                <img
                  src={`/assets/images/pages/${item.icon}`}
                  alt={item.name}
                />
              </div>
              <h3 className="mt-1 text-[15px] max-w-[200px] font-manrope-regular">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  )
};

export default CardProhibitedWithRestricted;
