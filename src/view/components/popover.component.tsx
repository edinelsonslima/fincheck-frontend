import { PropsWithChildren } from "react";
import * as RdxPopover from "@radix-ui/react-popover";
import { cn } from "../../app/utils/cn.utils";

interface PopoverProps {
  className?: string;
}

function PopoverRoot({ children }: PropsWithChildren) {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
}

function PopoverTrigger({
  children,
  className,
}: PropsWithChildren<PopoverProps>) {
  return (
    <RdxPopover.Trigger className={cn("outline-none", className)}>
      {children}
    </RdxPopover.Trigger>
  );
}

function PopoverContent({
  children,
  className,
}: PropsWithChildren<PopoverProps>) {
  return (
    <RdxPopover.Content
      className={cn(
        "z-50 rounded-2xl p-2 bg-white space-y-2 shadow-[0_11px_20px_0_rgba(0,0,0,0.10)]",
        "data-[side=bottom]:animate-slide-up-and-fade",
        "data-[side=top]:animate-slide-down-and-fade",
        className
      )}
    >
      {children}
    </RdxPopover.Content>
  );
}

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
};
