import { FormEvent, useEffect, useRef } from "react";
import { intlService } from "../../app/services/intl.service";

interface InputCurrencyEvent extends FormEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    value: string;
  };
}

export function InputCurrency() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: InputCurrencyEvent) => {
    if (!inputRef.current) return;
    const { selectionStart, selectionEnd } = inputRef.current;

    const value = e.target.value
      .replace(/[.,](?![^.,]*$)/g, "")
      .replace(",", ".")
      .replace(/\.0+$/g, "")
      .replace(/[^\d.]/g, "");

    const { priceValue } = intlService.intlCurrency(Number(value));
    e.target.value = priceValue;

    inputRef.current.setSelectionRange((selectionStart || 0) + 1, selectionEnd);
  };

  useEffect(() => inputRef.current?.focus(), [inputRef]);

  return (
    <input
      ref={inputRef}
      className="w-full text-gray-900 text-[2rem] font-bold tracking-tightest outline-none"
      placeholder={intlService.intlCurrency(Number(0)).priceValue}
      onChange={handleChange}
    />
  );
}
