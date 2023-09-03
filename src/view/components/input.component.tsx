import { ComponentProps, forwardRef, useId } from "react";
import { cn } from "../../app/utils/cn.utils";

import { IconCrossCircled } from "../../assets/icons/cross-circled.icon";

interface InputProps extends ComponentProps<"input"> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { placeholder, error, className, ...props },
  ref
) {
  const inputId = useId();

  return (
    <div className="relative">
      <input
        {...props}
        ref={ref}
        id={inputId}
        placeholder=" "
        className={cn(
          "peer px-3 pb-1 pt-5 w-full rounded-lg outline-none transition-all border border-gray-500 text-gray-800 bg-white focus:border-gray-800",
          { "!border-red-900": !!error },
          className
        )}
      />
      <label
        htmlFor={inputId}
        className="absolute left-[.8125rem] top-2 text-gray-700 text-xs transition-all pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:text-xs peer-focus:top-2"
      >
        {placeholder}
      </label>

      {error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <IconCrossCircled />
          <span className=" text-xs">{error}</span>
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
export { Input };
