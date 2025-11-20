import { usePage } from '@inertiajs/react';

const MissionHero = () => {
  const { mission, locale } = usePage<any>().props;

  return (
    <div id="vision-mission-core-values">
      {mission?.map((item: any) => (
        <div key={item.id}>
          <h2
            className={`mt-10 mb-5 text-center text-3xl tracking-tight text-primary md:mt-15 md:mb-5 ${
              locale === 'kh' ? 'font-bold' : 'font-manrope-extra-bold'
            }`}
          >
            {locale === 'kh' ? item?.name_kh || item?.name : item?.name}
          </h2>

          {item?.children?.map((subItem: any) => (
            <div
              key={subItem.id}
              className="relative mx-auto w-full max-w-[2000px] overflow-hidden"
            >
              {/* Background */}
              <img
                src="/assets/sesor/about_us/3BgMission.png"
                alt="Background"
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Content */}
              <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center">
                {/* Left Text */}
                <div className="flex flex-1 items-center justify-center p-4 text-white">
                  <div className="max-w-2xl">
                    <h2
                      className={`text-[25px] text-primary-two md:text-[40px] ${
                        locale === 'kh'
                          ? 'font-bold'
                          : 'font-manrope-extra-bold'
                      }`}
                    >
                      {locale === 'kh'
                        ? subItem?.name_kh || subItem?.name
                        : subItem?.name}
                    </h2>
                    <p
                      className={`mt-2 text-[18px] leading-relaxed md:text-[27px] ${
                        locale === 'kh'
                          ? ''
                          : 'font-manrope-regular'
                      }`}
                      dangerouslySetInnerHTML={{
                        __html:
                          locale === 'kh'
                            ? subItem?.short_description_kh ||
                              subItem?.short_description
                            : subItem?.short_description,
                      }}
                    />
                  </div>
                </div>

                {/* Right Image */}
                <div className="aspect-square lg:w-[500px]">
                  <img
                    src={`/assets/images/pages/${subItem?.images?.[0]?.image}`}
                    alt="Mission"
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
