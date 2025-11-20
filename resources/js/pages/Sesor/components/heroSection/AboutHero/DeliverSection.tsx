import { usePage } from '@inertiajs/react';

const DeliverSection = () => {
  const { whoWeDeliverFor, locale } = usePage<any>().props;

  return (
    <div id="who-we-deliver-for" className="flex items-center justify-center">
      <div className="section-container">
        {/* Title */}
        <h2
          className={`mt-10 mb-5 text-center text-3xl text-primary md:mt-15 md:mb-5 ${
            locale === 'kh' ? 'font-bold' : 'font-manrope-extra-bold'
          }`}
        >
          {locale === 'kh' ? whoWeDeliverFor?.name_kh || whoWeDeliverFor?.name : whoWeDeliverFor?.name}
        </h2>

        <div className="grid gap-8 md:gap-10 lg:grid-cols-2">
          {/* Description */}
          <div
            className={`flex flex-col space-y-4 text-[18px] lg:text-[25px] ${
              locale === 'kh' ? '' : 'font-manrope-extra-bold'
            }`}
            dangerouslySetInnerHTML={{
              __html:
                locale === 'kh'
                  ? whoWeDeliverFor?.long_description_kh || whoWeDeliverFor?.long_description
                  : whoWeDeliverFor?.long_description,
            }}
          />

          {/* Image */}
          <div className="grid w-full place-items-center">
            <img
              src={`/assets/images/pages/${whoWeDeliverFor?.images?.[0]?.image}`}
              alt="Logo"
              className="object-contain"
            />
          </div>
          {/* <LogosCard /> */}
        </div>
      </div>
    </div>
  );
};

export default DeliverSection;
