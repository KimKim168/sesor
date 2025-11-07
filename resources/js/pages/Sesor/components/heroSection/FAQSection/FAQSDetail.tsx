import { useState } from 'react';
import ButtonClose from '../../Bottons/ButtonClose';

const FAQSDetail = ({ faqs }) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [showFAQ, setShowFAQ] = useState(true);

    return (
        <div className="relative w-full bg-[#93288D] bg-cover bg-center">
            <div className="section-container relative w-full">
                {showFAQ && (
                    <div className="w-full py-6 md:py-12">
                        {faqs.map(({ id, question, answer }) => (
                            <div
                                key={id}
                                className="cursor-pointer"
                                onMouseEnter={() => setHoveredItem(id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                <div className="py-2 font-manrope-semi-bold text-[18px] text-white md:text-2xl">
                                    <ul className="m-0 list-inside list-disc">
                                        <li>{question}</li>
                                    </ul>
                                </div>
                                {hoveredItem === id && (
                                    <div
                                        className="ml-[24px] flex flex-col gap-1 bg-white p-2 font-manrope-semi-bold text-[15px] text-black md:text-xl"
                                        dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, '<br/>') }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {showFAQ && (
                    <div className="absolute right-2 bottom-2 xl:-right-17">
                        <button onClick={() => setShowFAQ(false)}>
                            <ButtonClose />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FAQSDetail;
