import { IconCrossCircled } from "@icons/cross-circled.icon";
import { intlService } from "@services/intl.service";
import { cn } from "@utils/cn.utils";
import { useState } from "react";
import { DatePicker } from "./date-picker.component";
import { Popover } from "./popover.component";

interface IDatePickerInputProps {
  error?: string;
  className?: string;
  value?: Date;
  onChange?(date: Date): void;
}

const { t, intlDate } = intlService;

export function DatePickerInput({
  className,
  error,
  onChange,
  value,
}: IDatePickerInputProps) {
  const [selectedDate, setSelectDate] = useState(value ?? new Date());

  const handleOnChange = (date: Date) => {
    setSelectDate(date);
    onChange?.(date);
  };

  return (
    <div>
      <Popover.Root>
        <Popover.Trigger
          className={cn(
            "relative px-3 pb-1 pt-5 w-full h-[3.125rem] rounded-lg outline-none transition-all border border-gray-500 text-gray-700 bg-white focus:border-gray-800 text-left",
            { "!border-red-900": !!error },
            className
          )}
        >
          <span className="absolute text-gray-700 text-xs left-[.8125rem] top-2">
            {t("Date")}
          </span>
          <span>{intlDate(selectedDate)}</span>
        </Popover.Trigger>

        <Popover.Content className="p-4">
          <DatePicker value={selectedDate} onChange={handleOnChange} />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <IconCrossCircled />
          <span className=" text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
