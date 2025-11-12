export const Logo = ({website_info}) => (
    <a href="/">
        <img id="logo-7" className="h-10 md:h-16 object-contain w-full" src={`/assets/images/website_infos/${website_info?.logo}`}></img>
    </a>
);
