import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CareerSubmit from '../Card/CareerSubmit';
import useTranslation from '@/hooks/use-translation';

function PopupDialog({ titleButton, item, locale }: any) {
    const fontClass = locale === 'kh' ? 'kamtumruy font-bold' : 'font-manrope-bold';
    const {t} = useTranslation();
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    variant="outline"
                    className="mt-20 rounded-full border-0 bg-primary-two  text-[15px] text-primary hover:bg-primary-two hover:text-primary dark:bg-primary-two"
                >
                    {titleButton}
                </Button>
            </DialogTrigger>

            <DialogContent className="section-container max-h-[90vh] overflow-y-auto rounded-2xl bg-true-primary p-4 sm:max-w-lg md:max-w-2xl md:p-6 lg:max-w-[1790px] [&_svg]:text-white [&_svg]:opacity-100">
                <DialogHeader>
                    <DialogTitle>
                        <div
                            className={`${locale === 'kh' ? 'font-kantumruy font-semibold' : 'font-manrope-semi-bold'}text-[18px] text-white md:text-[20px]`}
                        >
                            {t("Position")}: <span className="text-primary-two">{item?.position}</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                {/* Scrollable Career Form */}
                <div className="w-full">
                    <div className="flex w-full flex-col gap-6 rounded-lg lg:flex-row">
                        <div className="flex flex-1 flex-col gap-1">
                            <div className="border-purple-600 bg-white p-2 text-[12px]" dangerouslySetInnerHTML={{__html: item?.long_description}}>
                               
                            </div>
                        </div>
                        <CareerSubmit item={item} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export { PopupDialog };
