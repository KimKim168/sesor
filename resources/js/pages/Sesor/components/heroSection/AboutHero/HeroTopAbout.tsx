import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';

const HeroTopAbout = () => {
  const { whoWeAre, locale } = usePage<any>().props;
  const fontClass = locale === 'kh' ? 'font-kantumruy font-bold' : 'font-manrope-extra-bold';

  return (
    <div className="relative w-full max-w-[2000px] mx-auto" id="who-we-are">
      {/* Background Image */}
      <img
        src="/assets/sesor/about_us/1BgAbout.png"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative w-full overflow-hidden">
        {/* Right Positioned Image */}
        <img
          src="/assets/sesor/about_us/x.png"
          alt="SESOR Box"
          className="absolute right-0 md:-right-[250px] top-1/3 -translate-y-1/2 h-auto w-2/3 max-w-xl sm:w-1/2 md:w-[700px]"
        />

        {/* Content */}
        <div className="section-container relative grid min-h-[450px] grid-cols-1 items-center gap-10 md:grid-cols-1">
          {/* Left Content */}
          <div className="flex flex-col max-w-[1100px] py-6 md:py-12 text-white">
            <h2
              className={`text-[36px] text-primary-two md:text-[85px] ${fontClass}`}
            >
              {locale === 'kh'
                ? whoWeAre?.name_kh || whoWeAre?.name
                : whoWeAre?.name}
            </h2>

            <div
              className={`md:mt-4 space-y-5 text-base leading-relaxed md:text-2xl ${
                locale === 'kh' ? 'font-kantumruy' : 'font-manrope-regular'
              }`}
              dangerouslySetInnerHTML={{
                __html:
                  locale === 'kh'
                    ? whoWeAre?.long_description_kh ||
                      whoWeAre?.long_description
                    : whoWeAre?.long_description,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroTopAbout;
