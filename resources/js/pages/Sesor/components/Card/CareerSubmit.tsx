import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ButtonSubmit from '../Bottons/ButtonSubmit';
const CareerSubmit = () => {
    return (
        <div className="flex flex-1 flex-col gap-4">
            <Card className="border-none bg-transparent py-0 shadow-none">
                <CardContent className="bg-none p-0">
                    <form>
                        <div className="grid gap-x-8 gap-y-3">
                            <div className="col-span-2 sm:col-span-1">
                                <Label className="font-manrope-regular text-[20px] text-white" htmlFor="firstName">
                                    Name
                                </Label>
                                <Input id="name" className="mt-0.5 h-10 rounded-md bg-white shadow-none" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Label className="font-manrope-regular text-[20px] text-white" htmlFor="numberOrTelegram">
                                    Position
                                </Label>
                                <Input id="numberOrTelegram" className="mt-0.5 h-10 rounded-md bg-white shadow-none" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Label className="font-manrope-regular text-[20px] text-white" htmlFor="businessOrStoreName">
                                    Email
                                </Label>
                                <Input id="name" className="mt-0.5 h-10 rounded-md bg-white shadow-none" />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <Label className="font-manrope-regular text-[20px] text-white" htmlFor="pickUpLocation">
                                    Phone number
                                </Label>
                                <Input id="pickUpLocation" className="mt-0.5 h-10 rounded-md bg-white shadow-none" />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="mt-2">
                {/* ButtonAttachCv With ButtonSubmit */}
                <ButtonSubmit />
                {/* ButtonAttachCv With ButtonSubmit */}
            </div>
        </div>
    );
};

export default CareerSubmit;
