import { useState } from "react";
import { intlService } from "../../app/services/intl.service";
import { cn } from "../../app/utils/cn.utils";
import { IconChevronDown } from "../../assets/icons/chevron-down.icon";
import { IconColor } from "../../assets/icons/colors.icon";
import { IconCrossCircled } from "../../assets/icons/cross-circled.icon";
import { DropdownMenu } from "./dropdown-menu.component";

const colors: Color[] = [
  { color: "#868E96", bg: "#F8F9FA" },
  { color: "#FA5252", bg: "#FFF5F5" },
  { color: "#E64980", bg: "#FFF0F6" },
  { color: "#BE4BDB", bg: "#F8F0FC" },
  { color: "#7950F2", bg: "#F3F0FF" },
  { color: "#4C6EF5", bg: "#EDF2FF" },
  { color: "#228BE6", bg: "#E7F5FF" },
  { color: "#15AABF", bg: "#E3FAFC" },
  { color: "#12B886", bg: "#E6FCF5" },
  { color: "#40C057", bg: "#EBFBEE" },
  { color: "#82C91E", bg: "#F4FCE3" },
  { color: "#FAB005", bg: "#FFF9DB" },
  { color: "#FD7E14", bg: "#FFF4E6" },
  { color: "#212529", bg: "#F8F9FA" },
];

interface Color {
  color: string;
  bg: string;
}

interface ColorsDropdownInputProps {
  error?: string;
  className?: string;
}

const { intlTerm } = intlService;

export function ColorsDropdownInput({
  className,
  error,
}: ColorsDropdownInputProps) {
  const [selectedColor, setSelectedColor] = useState<null | Color>(null);

  const handleSelect = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          className={cn(
            "relative px-3 w-full h-[3.125rem] rounded-lg outline-none transition-all border border-gray-500 text-gray-700 bg-white focus:border-gray-800 text-left",
            { "!border-red-900": !!error },
            className
          )}
        >
          {intlTerm("Color")}

          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {!selectedColor && (
              <IconChevronDown className="w-6 h-6 text-gray-800" />
            )}

            {selectedColor && <IconColor {...selectedColor} />}
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="grid grid-cols-4">
          {colors.map(({ bg, color }) => (
            <DropdownMenu.Item
              key={color}
              onSelect={() => handleSelect({ bg, color })}
            >
              <IconColor bg={bg} color={color} />
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <IconCrossCircled />
          <span className=" text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
