import { Spinner } from "@animations/spinner.animation";
import { cn } from "@utils/cn.utils";
import { ComponentProps } from "react";

interface IButtonProps extends ComponentProps<"button"> {
  loading?: boolean;
  variant?: "danger" | "ghost";
}

export function Button({
  className,
  loading,
  disabled,
  children,
  variant,
  ...props
}: IButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled ?? loading}
      className={cn(
        "px-6 h-12 rounded-2xl font-medium transition-all bg-teal-900 text-white hover:bg-teal-800 active:bg-teal-900 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
        variant === "danger" && "bg-red-900 hover:bg-red-800",
        variant === "ghost" &&
          "bg-transparent hover:bg-gray-800/5 text-gray-800 border border-gray-800",
        className
      )}
    >
      {!loading && children}
      {loading && <Spinner className="mx-auto w-6 h-6" />}
    </button>
  );
}
