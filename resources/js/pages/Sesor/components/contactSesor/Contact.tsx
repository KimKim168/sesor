import { usePage } from '@inertiajs/react';
import GoogleMap from './GoogleMap';
import useTranslation from '@/hooks/use-translation';

const Contact = () => {
    const { media_links, website_info, app_url, contact_detail, locale } = usePage<any>().props;
    const {t} = useTranslation();
    const fontClass1 = locale === "kh" ? 'font-kantumruy font-extrabold' : 'font-manrope-extra-bold';
    const fontClass = locale === "kh" ? 'font-kantumruy' : 'font-manrope-semi-bold';
    return (
        <div id="contact-detail" className="mt-5 md:mt-10">
            <div className="section-container">
                <h2 className={`${fontClass1} text-center text-[20px] tracking-tight text-primary md:text-3xl`}>{t("Contact Detail")}</h2>

                <div className="mt-2.5 grid gap-5 md:mt-5 md:gap-10 lg:grid-cols-2">
                    {/* Google Map */}
                    <GoogleMap link={website_info?.google_map_embed} />
                    {/* End Google Map */}
                    {/* Contact Info */}
                    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
                        <div className="flex items-start gap-4">
                            <div className="w-10 flex-shrink-0 md:w-12">
                                <img src={`/assets/sesor/main_page/Phone.png`} alt={` Icon`} className="h-full w-full object-contain" />
                            </div>
                            <div>
                                <h3 className={`${fontClass} text-[17px] text-[#231F20] md:text-xl`}>{t("Call Us")}</h3>
                                <p
                                    className="font-manrope-regular text-[12px] whitespace-pre-line text-[#231F20] md:text-[15px]"
                                    dangerouslySetInnerHTML={{ __html: website_info?.phone }}
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-10 flex-shrink-0 md:w-12">
                                <img src={`/assets/sesor/main_page/Email.png`} alt={` Icon`} className="h-full w-full object-contain" />
                            </div>
                            <div>
                                <h3 className={`${fontClass} text-[17px] text-[#231F20] md:text-xl`}>{t('Email Us')}</h3>
                                <p
                                    className="font-manrope-regular text-[12px] text-[#231F20] md:text-[15px]"
                                    dangerouslySetInnerHTML={{ __html: website_info?.email }}
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 flex-shrink-0 md:w-12">
                                <img src={`/assets/sesor/main_page/Website.png`} alt={` Icon`} className="h-full w-full object-contain" />
                            </div>
                            <div>
                                <h3 className={`${fontClass} text-[17px] text-[#231F20] md:text-xl`}>{t("Website")}</h3>
                                <p
                                    className="font-manrope-regular text-[12px] text-[#231F20] md:text-[15px]"
                                    dangerouslySetInnerHTML={{ __html: app_url }}
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 flex-shrink-0 md:w-12">
                                <img src={`/assets/sesor/main_page/Address.png`} alt={` Icon`} className="h-full w-full object-contain" />
                            </div>
                            <div>
                                <h3 className={`${fontClass} text-[17px] text-[#231F20] md:text-xl`}>{t("Address")}</h3>
                                <p
                                    className="font-manrope-regular text-[12px] text-[#231F20] md:text-[15px]"
                                    dangerouslySetInnerHTML={{
                                        __html: locale === 'kh' ? website_info?.address_kh || website_info?.address : website_info?.address,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Social Links and QR */}
                        <div className="col-span-1 grid justify-between sm:col-span-2 sm:grid-cols-2 sm:gap-8">
                            {/* Social Links */}
                            <div className="mb-4 p-2 sm:mb-0">
                                <p className={`${fontClass} mb-2 text-[17px] text-[#231F20] md:text-xl`}>{t("Find us on")}</p>
                                <div className="flex flex-wrap gap-2">
                                    {media_links?.map((item: any) => (
                                        <a
                                            href={item?.link}
                                            key={item.id}
                                            className="transition-transform duration-300 hover:-translate-y-1 hover:scale-110 hover:opacity-80"
                                        >
                                            <img
                                                src={`/assets/images/links/thumb/${item.image}`}
                                                className="aspect-square h-7"
                                                alt={item?.name || 'image'}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* QR Codes */}
                            <div className="flex flex-wrap justify-start gap-2 p-2">
                                {contact_detail?.map((item) => (
                                    <a key={item.id} href={item?.link}>
                                        <img
                                            src={`/assets/images/links/thumb/${item?.image}`}
                                            className="aspect-square w-20 object-contain"
                                            alt={item?.name}
                                        />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
