import { usePage } from '@inertiajs/react';

const CoreValue = () => {
  const { coreValues, locale } = usePage<any>().props;

  // Default colors array
  const defaultColors = [
    "text-true-primary",
    "text-primary-two",
    "text-[#66499C]",
    "text-[#93288D]",
    "text-[#E7278D]",
  ];

  return (
    <div id="vision-mission-core-values" className="flex flex-col items-center justify-center">
      {coreValues?.map((item: any) => (
        <div key={item.id} className="text-center w-full">
          <h2 className={`mt-10 mb-5 text-center text-3xl tracking-tight md:mt-15 md:mb-5 ${
            locale === 'kh' ? 'font-kantumruy font-extrabold' : 'font-manrope-extra-bold'
          } text-primary`}>
            {locale === 'kh' ? item?.name_kh || item?.name : item?.name}
          </h2>

          <div className="section-container grid justify-between gap-6 md:grid-cols-2 md:gap-8 md:px-0 lg:grid-cols-3 xl:grid-cols-5">
            {item?.children?.map((subItem: any, index: number) => {
              // Pick backend color or default
              const textColor = subItem.colorClass ?? defaultColors[index % defaultColors.length];

              return (
                <div
                  key={subItem.id}
                  className={`flex flex-col items-center text-center font-medium ${textColor}`}
                >
                  {/* Image */}
                  <div className="flex aspect-square w-20 items-center justify-center">
                    <img
                      src={`/assets/images/pages/${subItem?.icon}`}
                      alt={locale === 'kh' ? subItem?.name_kh || subItem?.name : subItem?.name}
                    />
                  </div>

                  {/* Color bar */}
                  <div className={`my-2 h-5 w-[200px] ${textColor.replace('text-', 'bg-')}`} />

                  {/* Title */}
                  <h3 className={`${locale === 'kh' ? 'font-kantumruy font-semibold' : 'font-manrope-semi-bold'} text-[22px]`}>
                    {locale === 'kh' ? subItem?.name_kh || subItem?.name : subItem?.name ?? "Default Title"}
                  </h3>

                  {/* Description */}
                  <p className={`${locale === 'kh' ? 'font-kantumruy' : 'font-manrope-regular'} mt-0.5 text-[14px]`}>
                    {locale === 'kh' ? subItem?.short_description_kh || subItem?.short_description : subItem?.short_description ?? "No description available."}
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
