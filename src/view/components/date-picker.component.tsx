import { ptBR, enUS } from "date-fns/locale";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { intlService } from "../../app/services/intl.service";
import { capitalizeFirstLetter } from "../../app/utils/capitalize-first-letter.utils";

interface IDatePickerProps {
  value: Date;
  onChange(date: Date): void;
}

const { getLocalStorageLanguage } = intlService;

export function DatePicker({ value, onChange }: IDatePickerProps) {
  return (
    <DayPicker
      selected={value}
      locale={getLocalStorageLanguage() === "en-us" ? enUS : ptBR}
      onSelect={(date) => onChange(date ?? new Date())}
      mode="single"
      classNames={{
        caption: "flex items-center justify-between",
        nav: "flex gap-1",
        nav_button_previous:
          "text-teal-800 flex items-center justify-center !bg-transparent",
        nav_button_next:
          "text-teal-800 flex items-center justify-center !bg-transparent",
        head_cell: "uppercase text-xs text-gray-500 font-medium pt-1 pb-2",
        button:
          "text-gray-700 cursor-pointer w-10 h-10 hover:bg-teal-100 rounded-full",
        day_today: "bg-gray-100 font-bold text-gray-900",
        day_selected: "!bg-teal-900 text-white font-medium",
      }}
      formatters={{
        formatCaption: (date, options) => {
          return (
            <span className="text-gray-900 tracking-tighter font-medium">
              {capitalizeFirstLetter(format(date, "LLLL yyyy", options))}
            </span>
          );
        },
      }}
    ></DayPicker>
  );
}
