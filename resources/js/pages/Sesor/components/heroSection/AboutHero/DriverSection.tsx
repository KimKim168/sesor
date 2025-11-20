import { usePage } from "@inertiajs/react";

const DriverAndCustomerServiceSection = () => {
  const { ourTeam, locale } = usePage<any>().props; 
  if (!ourTeam || ourTeam.length === 0) return null;

  // Get main parent
  const parent = ourTeam[0];

  // Extract children
  const driver = parent?.children?.find((child) => child.code === "our-driver");
  const customerService = parent?.children?.find(
    (child) => child.code === "our-customer-service"
  );
 
  return (
    <>
      {/* ===== Driver Section ===== */}
      <h2
        id="our-team"
        className={`mt-10 md:mt-15 mb-5 md:mb-5 text-center tracking-tight text-primary text-3xl ${
          locale === 'kh' ? 'font-bold' : 'font-manrope-extra-bold'
        }`}
      >
        {locale === 'kh' ? parent.name_kh || parent.name : parent.name}
      </h2>

      {/* Driver */}
      <div className="relative w-full max-w-[2000px] mx-auto overflow-hidden">
        <img
          src="/assets/sesor/about_us/2BgVision.png"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="flex flex-col gap-4 lg:flex-row items-center relative">
          <div className="lg:w-[500px] aspect-square">
            <img
              src={`/assets/images/pages/${driver?.images?.[0]?.image}`}
              alt={locale === 'kh' ? driver?.name_kh || driver?.name : driver?.name}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-1 pb-[16px] md:pb-12 lg:pb-0 justify-center items-center section-container">
            <div className="max-w-2xl text-white">
              <h2
                className={`text-[25px] text-center text-primary-two md:text-[40px] ${
                  locale === 'kh' ? 'font-bold' : 'font-manrope-extra-bold'
                }`}
              >
                {locale === 'kh' ? driver?.name_kh || driver?.name : driver?.name}
              </h2>

              <div
                className={`text-[18px] md:text-[27px] whitespace-pre-line ${
                  locale === 'kh' ? '' : 'font-manrope-regular'
                }`}
                dangerouslySetInnerHTML={{
                  __html:
                    locale === 'kh'
                      ? driver?.short_description_kh || driver?.short_description
                      : driver?.short_description,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ===== Customer Service Section ===== */}
      <div className="relative mx-auto mt-10 w-full max-w-[2000px] overflow-hidden">
        <img
          src="/assets/sesor/about_us/3BgMission.png"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="relative flex flex-col items-center gap-4 lg:flex-row">
          <div className="flex flex-1 items-center justify-center pt-[16px] md:pt-12 lg:pt-0">
            <div className="max-w-2xl text-white px-4 lg:px-0">
              <h2
                className={`text-[25px] text-center text-primary-two md:text-[40px] ${
                  locale === 'kh' ? 'font-bold' : 'font-manrope-extra-bold'
                }`}
              >
                {locale === 'kh'
                  ? customerService?.name_kh || customerService?.name
                  : customerService?.name}
              </h2>

              <div
                className={`text-[18px] leading-[1.4] md:text-[27px] whitespace-pre-line ${
                  locale === 'kh' ? '' : 'font-manrope-regular'
                }`}
                dangerouslySetInnerHTML={{
                  __html:
                    locale === 'kh'
                      ? customerService?.short_description_kh || customerService?.short_description
                      : customerService?.short_description,
                }}
              />
            </div>
          </div>

          <div className="aspect-square lg:w-[500px]">
            <img
              src={`/assets/images/pages/${customerService?.images?.[0]?.image}`}
              alt='image'
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverAndCustomerServiceSection;
