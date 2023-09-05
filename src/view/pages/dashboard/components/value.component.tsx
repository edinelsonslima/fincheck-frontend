import { useMemo } from "react";
import { intlService } from "../../../../app/services/intl.service";
import { cn } from "../../../../app/utils/cn.utils";

interface ValueProps {
  value: number;
  visible: boolean;
  className?: string;
  blur?: "sm" | "md";
}

export function Value({ value, className, visible, blur = "md" }: ValueProps) {
  const { intlCurrency } = useMemo(() => intlService, []);
  const formattedValue = intlCurrency(value);
  return (
    <span
      className={cn(
        className,
        !visible && blur === "md" && "blur-md",
        !visible && blur === "sm" && "blur-sm"
      )}
    >
      {visible && formattedValue}
      {!visible && formattedValue.replace(/[0-9]/g, "0")}
    </span>
  );
}
