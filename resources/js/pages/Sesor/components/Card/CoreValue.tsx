import { usePage } from '@inertiajs/react';

const CoreValue = () => {
  const { coreValues, locale } = usePage<any>().props;

  const defaultColors = [
    '#6a2e90',
    '#f3ab1c',
    '#66499C',
    '#93288D',
    '#E7278D',
  ];

  return (
    <div id="vision-mission-core-values" className="flex flex-col items-center justify-center">
      {coreValues?.map((item: any) => (
        <div key={item.id} className="w-full text-center">
          {/* Section Title */}
          <h2
            className={`mt-10 mb-5 text-center text-3xl md:mt-15 md:mb-5 ${
              locale === 'kh' ? 'font-bold' : 'font-manrope-extra-bold'
            } text-primary`}
          >
            {locale === 'kh' ? item?.name_kh || item?.name : item?.name}
          </h2>

          {/* Grid */}
          <div className="section-container grid justify-between gap-6 md:grid-cols-2 md:gap-8 md:px-0 lg:grid-cols-3 xl:grid-cols-5">
            {item?.children?.map((subItem: any, index: number) => {
              // Backend HEX or fallback
              const color =
                subItem.colorHex ||
                defaultColors[index % defaultColors.length];

              return (
                <div
                  key={subItem.id}
                  className="flex flex-col items-center text-center font-medium"
                  style={{ color: color }}  
                >
                  {/* Image */}
                  <div className="flex aspect-square w-20 items-center justify-center">
                    <img
                      src={`/assets/images/pages/${subItem?.icon}`}
                      alt={
                        locale === 'kh'
                          ? subItem?.name_kh || subItem?.name
                          : subItem?.name
                      }
                    />
                  </div>

                 
                  <div
                    className="my-2 h-5 w-[200px]"
                    style={{ backgroundColor: color }}
                  />

                  {/* Title */}
                  <h3
                    className={`text-[22px] ${
                      locale === 'kh'
                        ? 'font-bold'
                        : 'font-manrope-semi-bold'
                    }`}
                  >
                    {locale === 'kh'
                      ? subItem?.name_kh || subItem?.name
                      : subItem?.name ?? 'Default Title'}
                  </h3>

                  {/* Description */}
                  <p
                    className={`mt-0.5 text-[14px] ${
                      locale === 'kh' ? '' : 'font-manrope-regular'
                    }`}
                  >
                    {locale === 'kh'
                      ? subItem?.short_description_kh ||
                        subItem?.short_description
                      : subItem?.short_description ??
                        'No description available.'}
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
