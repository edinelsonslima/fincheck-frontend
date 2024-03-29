import { IconChevronDown } from "@icons/chevron-down.icon";
import { IconChevronUp } from "@icons/chevron-up.icon";
import { IconCrossCircled } from "@icons/cross-circled.icon";
import * as RdxSelect from "@radix-ui/react-select";
import { cn } from "@utils/cn.utils";
import { useState } from "react";

interface IOptionProps {
  value: string;
  label: string;
}

interface ISelectProps {
  error?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  options: IOptionProps[];
  onChange?(value: string): void;
}

export function Select({
  className,
  error,
  placeholder,
  options,
  onChange,
  value,
}: ISelectProps) {
  const [selectedValue, setSelectedValue] = useState(value);

  const handleSelect = (value: string) => {
    onChange?.(value);
    setSelectedValue(value);
  };

  return (
    <div>
      <div className="relative">
        <label
          className={cn(
            "absolute z-10 left-3 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none",
            !!selectedValue && "text-xs left-[.8125rem] top-3.5 transition-all"
          )}
        >
          {placeholder}
        </label>

        <RdxSelect.Root onValueChange={handleSelect} value={value}>
          <RdxSelect.Trigger
            className={cn(
              "relative px-3 pb-1 pt-5 w-full h-[3.125rem] rounded-lg outline-none transition-all border border-gray-500 text-gray-800 bg-white focus:border-gray-800 text-left",
              { "!border-red-900": !!error },
              className
            )}
          >
            <RdxSelect.Value />
            <RdxSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
              <IconChevronDown className="w-6 h-6 text-gray-800" />
            </RdxSelect.Icon>
          </RdxSelect.Trigger>

          <RdxSelect.Portal>
            <RdxSelect.Content className="z-50 overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0_11px_20px_0_rgba(0,0,0,0.10)]">
              <RdxSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <IconChevronUp />
              </RdxSelect.ScrollUpButton>

              <RdxSelect.Viewport className="p-2">
                {options.map(({ label, value }) => (
                  <RdxSelect.Item
                    key={value}
                    value={value}
                    className="cursor-pointer p-2 text-gray-800 text-sm rounded-lg transition-colors data-[state=checked]:font-bold outline-none hover:bg-gray-50"
                  >
                    <RdxSelect.ItemText>{label}</RdxSelect.ItemText>
                  </RdxSelect.Item>
                ))}
              </RdxSelect.Viewport>

              <RdxSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                <IconChevronDown />
              </RdxSelect.ScrollDownButton>
            </RdxSelect.Content>
          </RdxSelect.Portal>
        </RdxSelect.Root>
      </div>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <IconCrossCircled />
          <span className=" text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
