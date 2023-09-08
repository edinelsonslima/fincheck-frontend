import * as RdxDropdownMenu from "@radix-ui/react-dropdown-menu";
import { PropsWithChildren } from "react";
import { cn } from "../../app/utils/cn.utils";

interface DropdownMenuProps {
  className?: string;
}

function DropdownMenuRoot({ children }: PropsWithChildren) {
  return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
}

function DropdownTrigger({
  children,
  className,
}: PropsWithChildren<DropdownMenuProps>) {
  return (
    <RdxDropdownMenu.Trigger className={cn("outline-none", className)}>
      {children}
    </RdxDropdownMenu.Trigger>
  );
}

function DropdownContent({
  children,
  className,
}: PropsWithChildren<DropdownMenuProps>) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.Content
        side="bottom"
        className={cn(
          "z-10 rounded-2xl p-2 bg-white space-y-2 shadow-[0_11px_20px_0_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slide-up-and-fade",
          className
        )}
      >
        {children}
      </RdxDropdownMenu.Content>
    </RdxDropdownMenu.Portal>
  );
}

function DropdownItem({
  children,
  className,
  ...props
}: RdxDropdownMenu.DropdownMenuItemProps) {
  return (
    <RdxDropdownMenu.Item
      {...props}
      className={cn(
        "min-h-[2.5rem] outline-none flex items-center py-2 px-4 text-sm text-gray-800 rounded-lg transition-colors cursor-pointer data-[highlighted]:bg-gray-50",
        className
      )}
    >
      {children}
    </RdxDropdownMenu.Item>
  );
}

function DropdownSub({ children }: PropsWithChildren) {
  return <RdxDropdownMenu.Sub>{children}</RdxDropdownMenu.Sub>;
}

function DropdownSubTrigger({
  children,
  className,
}: PropsWithChildren<DropdownMenuProps>) {
  return (
    <RdxDropdownMenu.SubTrigger
      className={cn(
        "min-h-[2.5rem] outline-none flex items-center py-2 px-4 text-sm text-gray-800 rounded-lg transition-colors cursor-pointer data-[highlighted]:bg-gray-50",
        className
      )}
    >
      {children}
    </RdxDropdownMenu.SubTrigger>
  );
}

function DropdownSubContent({ children }: PropsWithChildren) {
  return (
    <RdxDropdownMenu.Portal>
      <RdxDropdownMenu.SubContent
        sideOffset={-1}
        alignOffset={0}
        className="z-10 rounded-xl p-2 bg-white space-y-2 text-sm text-gray-800 shadow-[0_11px_20px_0_rgba(0,0,0,0.10)]"
      >
        {children}
      </RdxDropdownMenu.SubContent>
    </RdxDropdownMenu.Portal>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
  Sub: DropdownSub,
  SubTrigger: DropdownSubTrigger,
  SubContent: DropdownSubContent,
};
