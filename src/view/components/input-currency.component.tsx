import { FormEvent, useEffect, useRef } from "react";
import { intlService } from "../../app/services/intl.service";
import { IconCrossCircled } from "../../assets/icons/cross-circled.icon";
import { cn } from "../../app/utils/cn.utils";
import { currencyStringToNumber } from "../../app/utils/currency-string-to-number";

interface InputCurrencyEvent extends FormEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    value: string;
  };
}

interface InputCurrencyProps {
  error?: string;
  value?: number;
  onChange?(value: number | undefined): void;
}

const { intlCurrency } = intlService;

export function InputCurrency({ error, onChange, value }: InputCurrencyProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const getFormattedPrice = (value = 0) => {
    const { priceValue } = intlCurrency(value);
    return priceValue;
  };

  const handleChange = (e: InputCurrencyEvent) => {
    const hasValue = Number(e.target.value.replace(/\D/g, ""));

    if (!hasValue || !inputRef.current) {
      onChange?.(undefined);
      return (e.target.value = "");
    }

    const { selectionStart, selectionEnd } = inputRef.current;

    const price = getFormattedPrice(currencyStringToNumber(e.target.value));
    onChange?.(currencyStringToNumber(price));
    e.target.value = price;

    inputRef.current.setSelectionRange((selectionStart || 0) + 1, selectionEnd);
  };

  useEffect(() => inputRef.current?.focus(), [inputRef]);

  return (
    <div>
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

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <IconCrossCircled />
          <span className=" text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
