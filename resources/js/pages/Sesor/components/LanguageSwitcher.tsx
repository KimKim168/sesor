import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useTranslation from '@/hooks/use-translation';
import { usePage } from '@inertiajs/react';
import { Languages } from 'lucide-react';
export function LanguageSwitcher() {
    const { locale } = usePage().props; 
    const { t } = useTranslation();
    const fontClass = locale === 'kh' ? 'font-bold' : 'font-manrope-bold';
    return (
        <Select
            defaultValue={locale || 'en'} // fallback English
            onValueChange={(val) => {
                window.location.href = `/lang/${val}`; // redirect to language route
            }}
        >
            <SelectTrigger className={`w-[120px] text-[15px] ${fontClass} items-center justify-center text-primary border-none shadow-none [&>svg]:text-primary [&_svg]:w-4 [&_svg]:h-3`}>
            <Languages className='text-primary w-3 h-3 mr-1'/>
                <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup className={`text-primary text-[15px] ${fontClass}`}>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="kh">{t("Khmer")}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
