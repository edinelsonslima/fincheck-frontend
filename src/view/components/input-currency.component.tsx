// import { NumericFormat } from "react-number-format";
// <NumericFormat
//   thousandSeparator="."
//   decimalSeparator=","
//
// />

import { FormEvent } from "react";
import { intlService } from "../../app/services/intl.service";

interface InputCurrencyEvent extends FormEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    value: string;
  };
}

export function InputCurrency() {
  return (
    <input
      className="text-gray-800 text-[2rem] font-bold tracking-tightest outline-none"
      defaultValue={intlService.intlCurrency(0)}
      // onInput={(event: InputCurrencyEvent) => {
      //   const value = Number(event.target.value.replace(/[^0-9]/g, ""));
      //   event.target.value = intlService.intlCurrency(value);
      // }}
      // onChange={(event: InputCurrencyEvent) => {
      //   const value = Number(event.target.value.replace(/[^0-9]/g, ""));
      //   event.target.value = intlService.intlCurrency(value);
      // }}
      onBlur={(event: InputCurrencyEvent) => {
        const value = Number(event.target.value.replace(/[^0-9]/g, ""));
        event.target.value = intlService.intlCurrency(value);
      }}  
    />
  );
}
