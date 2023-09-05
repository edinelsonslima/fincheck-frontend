import { useMemo } from "react";
import { languageService } from "../../../../app/services/language.service";
import { cn } from "../../../../app/utils/cn.utils";

interface ValueProps {
  value: number;
  visible: boolean;
  className?: string;
  blur?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "0" | "none";
}

export function Value({ value, className, visible, blur = "md" }: ValueProps) {
  const { intlCurrency } = useMemo(() => languageService, []);
  const formattedValue = intlCurrency(value);
  return (
    <span className={cn(className, !visible && `blur-${blur}`)}>
      {visible && formattedValue}
      {!visible && formattedValue.replace(/[0-9]/g, "0")}
    </span>
  );
}
