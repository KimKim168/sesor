import useTranslation from '@/hooks/use-translation';
import { ReactNode } from 'react';
import Footer from './components/Footer';
import Navbar02Page from './components/navbars/navbar';
interface LayoutProps {
    children: ReactNode;
}

const SesorLayout = ({ children }: LayoutProps) => {
    const { currentLocale } = useTranslation();
    return (
        <div className={`${currentLocale == 'kh' ? 'font-sesor-khmer' : 'font-sesor-english'} bg-white`}>
            <Navbar02Page />
            <main className={`mx-auto min-h-screen`}>{children}</main>
            {/* <ScrollToTopButton/> */}
            <Footer />
            {/* <div
                rel="noopener noreferrer"
                className="animate-fadeUp fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-red-600 via-sky-600 to-red-500/90 text-white backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
                <LanguageSwitcher/>
            </div> */}
        </div>
    );
};

export default SesorLayout;
