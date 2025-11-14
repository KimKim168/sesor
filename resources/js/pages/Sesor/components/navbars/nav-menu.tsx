import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import useTranslation from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';
import React, { ComponentProps } from 'react';

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => {
    const { t } = useTranslation();
    const { locale } = usePage().props;
    const fontClass = locale === 'kh' ? 'font-kantumruy font-bold' : 'font-manrope-bold';
    return (
        <NavigationMenu {...props} viewport={false}>
            <NavigationMenuList className="gap-1 space-x-0 text-sm">
                {/* About */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={`${fontClass} text-[15px] text-primary`}>
                        <a href="/about_us">{t('About Us')}</a>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-10 group-data-[viewport=false]/navigation-menu:bg-true-primary">
                        <ul className="grid w-[200px] md:grid-cols-1">
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
                                <ListItem key={item.title} title={item.title} href={`${item.id}`} className="py-1">
                                    {t(item.title)}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Services */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={`${fontClass} text-[15px] text-primary`}>
                        <a href="/service">{t('Services')}</a>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-10 group-data-[viewport=false]/navigation-menu:bg-true-primary">
                        <ul className="grid w-[200px] md:grid-cols-1">
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
                                <ListItem key={item.title} title={item.title} href={`${item.id}`} className="py-1">
                                    {t(item.title)}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Contact */}
                <NavigationMenuItem>
                    <NavigationMenuTrigger className={`${fontClass} text-[15px] text-primary`}>
                        {' '}
                        <Link href="/#contact-detail">{t("Contact Us")}</Link>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-10 group-data-[viewport=false]/navigation-menu:bg-true-primary">
                        <ul className="grid w-[200px] md:grid-cols-1">
                            {[
                                {
                                    title: 'Contact Detail',
                                    id: '#contact-detail',
                                },
                            ].map((item) => (
                                <ListItem key={item.title} title={item.title} href={`/${item.id}`} className="py-1">
                                    {t(item.title)}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
};

const ListItem = React.forwardRef<React.ElementRef<typeof Link>, React.ComponentPropsWithoutRef<typeof Link> & { title: string }>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li className="relative">
                <NavigationMenuLink asChild>
                    <Link
                        ref={ref}
                        className={cn(
                            'block space-y-2 rounded-md p-2 leading-none no-underline outline-hidden transition-colors select-none hover:bg-white/10',
                            className,
                        )}
                        {...props}
                    >
                        <p className="line-clamp-2 font-manrope-light text-sm leading-snug text-white">{children}</p>
                    </Link>
                </NavigationMenuLink>
            </li>
        );
    },
);
ListItem.displayName = 'ListItem';
