import { FormEvent, useEffect, useRef } from "react";
import { intlService } from "../../app/services/intl.service";
import { IconCrossCircled } from "../../assets/icons/cross-circled.icon";
import { cn } from "../../app/utils/cn.utils";

interface IInputCurrencyProps {
  error?: string;
  value?: number;
  onChange?(value: number | undefined): void;
}

const { intlCurrency } = intlService;

export function InputCurrency({ error, onChange, value }: IInputCurrencyProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { currencySymbol } = intlCurrency(0);

  const getFormattedPrice = (value = 0) => {
    const { priceValue } = intlCurrency(value);
    return priceValue;
  };

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const inputValue = Number(e.currentTarget.value.replace(/\D/g, ""));

    if (isNaN(inputValue) || !inputRef.current) {
      onChange?.(undefined);
      return (e.currentTarget.value = "");
    }

    const value = inputValue / 100;
    const price = getFormattedPrice(value);

    onChange?.(value);
    e.currentTarget.value = price;
  };

  useEffect(() => inputRef.current?.focus(), [inputRef]);

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="text-gray-600 tracking-tighter text-lg">
          {currencySymbol}
        </span>

        <input
          ref={inputRef}
          onChange={handleChange}
          placeholder={getFormattedPrice()}
          defaultValue={value ? getFormattedPrice(value) : undefined}
          className={cn(
            "w-full text-gray-900 text-[2rem] font-bold tracking-tightest outline-none",
            error && "text-red-900 placeholder:text-red-900/50"
          )}
        />
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
