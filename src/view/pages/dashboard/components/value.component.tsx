import { intlService } from "../../../../app/services/intl.service";
import { cn } from "../../../../app/utils/cn.utils";

interface ValueProps {
  value: number;
  visible: boolean;
  className?: string;
  blur?: "sm" | "md";
}

const { intlCurrency } = intlService;

export function Value({ value, className, visible, blur = "md" }: ValueProps) {
  const { price } = intlCurrency(value);
  return (
    <span
      className={cn(
        className,
        !visible && blur === "md" && "blur-md",
        !visible && blur === "sm" && "blur-sm"
      )}
    >
      {visible && price}
      {!visible && price.replace(/[0-9]/g, "0")}
    </span>
  );
}
