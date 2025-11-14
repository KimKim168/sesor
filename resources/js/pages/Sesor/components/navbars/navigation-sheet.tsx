import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { about, contact, services } from './config';
import useTranslation from '@/hooks/use-translation';

export const NavigationSheet = () => {
    const { t } = useTranslation();
    const { locale } = usePage().props;
    const fontClass = locale === 'kh' ? 'font-kantumruy font-bold' : 'font-manrope-bold';
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Menu className='text-primary'/>
                </Button>
            </SheetTrigger>
            <SheetContent className="px-6 py-3">
                <a href="/">
                    <img id="logo-7" className="h-16 w-full object-contain" src="/assets/sesor/SESORLogo1.png"></img>
                </a>
                <div className="space-y-4 text-base">
                    <div>
                        <div className={`${fontClass} text-primary text-[15px]`}><Link href='/about_us'>{t("About Us")}</Link> </div>

                        <ul className="mt-2 ml-1 space-y-3 border-l pl-4">
                            {[
                                {
                                    title: 'Who We Are',
                                    id: 'about_us#who-we-are',
                                },
                                {
                                    title: 'Vision, Mission & Core Values',
                                    id: 'about_us#vision-mission-core-values',
                                },
                                {
                                    title: 'Our Team',
                                    id: 'about_us#our-team',
                                },
                                {
                                    title: 'Who We Deliver For',
                                    id: 'about_us#who-we-deliver-for',
                                },
                                {
                                    title: 'Campaign & Promotion',
                                    id: '/campaign_promotion',
                                },
                                {
                                    title: 'Career',
                                    id: 'about_us#career',
                                },
                            ].map((item) => (
                                <li key={item.title}>
                                    <Link href={`${item.id}`} className="flex items-center gap-2">
                                        {t(item.title)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className={`${fontClass} text-primary text-[15px]`}><Link href='/service'>{t("Services")}</Link> </div>
                        <ul className="mt-2 ml-1 space-y-3 border-l pl-4">
                            {[
                                {
                                    title: 'Our Services',
                                    id: 'service#our-services',
                                },
                                {
                                    title: 'What We Deliver',
                                    id: 'service#what-we-deliver',
                                },
                                {
                                    title: 'Prohibited Items',
                                    id: 'service#prohibited-items',
                                },
                                {
                                    title: 'Inquiry Lead Form',
                                    id: 'service#inquiry-lead-form',
                                },
                                {
                                    title: 'Charges & Rates',
                                    id: 'service#charges-rates',
                                },
                                {
                                    title: 'Benefits',
                                    id: 'service#benefits',
                                },
                            ].map((item) => (
                                <li key={item.title}>
                                    <Link href={`${item.id}`} className="flex items-center gap-2">
                                        {t(item.title)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <div className={`${fontClass} text-primary text-[15px]`}><Link href='/#contact-detail'>{t("Contact Us")}</Link> </div>
                        <ul className="mt-2 ml-1 space-y-3 border-l pl-4">
                            {[
                                {
                                    title: 'Contact Detail',
                                    id: '#contact-detail',
                                },
                            ].map((item) => (
                                <li key={item.title}>
                                    <Link href={`/#contact-detail`} className="flex items-center gap-2">
                                        {t(item.title)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
