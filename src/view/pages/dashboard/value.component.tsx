import { intlService } from "../../../app/services/intl.service";
import { cn } from "../../../app/utils/cn.utils";
import { useDashboard } from "./use-controller.hook";

interface IValueProps {
  value: number;
  className?: string;
  blur?: "sm" | "md";
}

const { intlCurrency } = intlService;

export function Value({ value, className, blur = "md" }: IValueProps) {
  const { price } = intlCurrency(value);
  const { areValuesVisible } = useDashboard();

  return (
    <span
      className={cn(
        className,
        !areValuesVisible && blur === "md" && "blur-md",
        !areValuesVisible && blur === "sm" && "blur-sm"
      )}
    >
      {areValuesVisible && price}
      {!areValuesVisible && price.replace(/[0-9]/g, "0")}
    </span>
  );
}
