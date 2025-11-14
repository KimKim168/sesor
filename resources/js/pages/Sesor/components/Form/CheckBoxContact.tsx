import { Checkbox } from "@/components/ui/checkbox";
import { usePage } from "@inertiajs/react";

interface CheckBoxContactProps {
  value: string; // current selected value from parent
  onChange: (value: string) => void; // update parent
}

export default function CheckBoxContact({ value, onChange }: CheckBoxContactProps) {
  const { locale } = usePage().props;

  const Deliverys = [
    { name: "Telegram", label: locale === "kh" ? "ទូរសារ Telegram" : "Telegram" },
    { name: "Phone Call", label: locale === "kh" ? "ទូរស័ព្ទ" : "Phone Call" },
    { name: "Email", label: locale === "kh" ? "អ៊ីមែល" : "Email" },
  ];

  const fontClass = locale === "kh" ? "font-kantumruy" : "font-manrope-medium";

  return (
    <div className="mt-2 flex flex-col items-start gap-4">
      {Deliverys.map(({ name, label }) => (
        <div key={name} className="flex items-center gap-4">
          <Checkbox
            checked={value === name}
            onCheckedChange={() => onChange(name)}
            id={`${name}-vertical`}
          />
          <label
            htmlFor={`${name}-vertical`}
            className={`flex items-center gap-2 text-[15px] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${fontClass}`}
          >
            {label}
          </label>
        </div>
      ))}
    </div>
  );
}
