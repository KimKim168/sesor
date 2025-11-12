import { Link } from '@inertiajs/react';

export const LogoFooter = ({website_info}:any) => (
    <Link href="/">
        <img id="logo-7" className="w-1/2 xl:w-full" 
        src={`/assets/images/website_infos/${website_info?.logo_darkmode}`} alt='logoDarkmode'></img>
    </Link>
);
