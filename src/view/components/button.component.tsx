import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn.utils";
import { Spinner } from "../../assets/animations/spinner.animation";

interface ButtonProps extends ComponentProps<"button"> {
  loading?: boolean;
}

export function Button({
  className,
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <>
      <button
        {...props}
        disabled={disabled ?? loading}
        className={cn(
          "px-6 h-12 rounded-2xl font-medium transition-all bg-teal-800 text-white hover:bg-teal-800 active:bg-teal-900 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
          className
        )}
      >
        {!loading && children}
        {loading && <Spinner className="mx-auto w-6 h-6" />}
      </button>
    </>
  );
}
