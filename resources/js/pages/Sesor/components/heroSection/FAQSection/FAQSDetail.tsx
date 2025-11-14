import { useState } from 'react';
import ButtonClose from '../../Bottons/ButtonClose';

const FAQSDetail = ({ faqs, locale }:any) => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [showFAQ, setShowFAQ] = useState(true);
    const fontClass = locale === "kh" ? 'font-kantumruy font-semibold' : 'font-manrope-semi-bold';

    return (
        <div className="relative w-full bg-[#93288D] bg-cover bg-center">
            <div className="section-container relative w-full">
                {showFAQ && (
                    <div className="w-full py-6 md:py-12">
                         {faqs.map(({ id, question, question_kh, answer, answer_kh }: any) => (
                            <div
                                key={id}
                                className="cursor-pointer"
                                onMouseEnter={() => setHoveredItem(id)}
                                onMouseLeave={() => setHoveredItem(null)}
                            >
                                {/* Question */}
                                <div className={`py-2 ${fontClass} text-[18px] text-white md:text-2xl`}>
                                    <ul className="m-0 list-inside list-disc">
                                        <li>
                                            {locale === 'kh'
                                                ? question_kh || question
                                                : question}
                                        </li>
                                    </ul>
                                </div>
                                {/* Answer (only show when hovered) */}
                                {hoveredItem === id && (
                                    <div
                                        className={`ml-[24px] flex flex-col gap-1 bg-white p-2 text-[15px]  md:text-xl ${fontClass}`}
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                (locale === 'kh'
                                                    ? (answer_kh || answer)
                                                    : answer
                                                ).replace(/\n/g, '<br/>'),
                                        }}
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
