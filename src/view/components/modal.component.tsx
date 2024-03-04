import { IconCross } from "@icons/cross.icon";
import * as RdxDialog from "@radix-ui/react-dialog";
import { cn } from "@utils/cn.utils";
import { PropsWithChildren } from "react";

interface IModalProps {
  open: boolean;
  title: string;
  onClose?(): void;
  rightAction?: React.ReactNode;
  className?: string;
}

export function Modal({
  open,
  title,
  onClose,
  children,
  className,
  rightAction,
}: PropsWithChildren<IModalProps>) {
  return (
    <RdxDialog.Root open={open} onOpenChange={onClose}>
      <RdxDialog.Portal>
        <RdxDialog.Overlay
          className={cn("z-10 fixed inset-0 bg-black/80 backdrop-blur-sm")}
        />
        <RdxDialog.Content
          className={cn(
            "z-20 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
            "p-6 space-y-10 w-full max-w-[25rem] bg-white rounded-2xl shadow-[0_11px_20px_0_rgba(0,0,0,0.10)] outline-none",
            "data-[state=open]:animate-content-show"
          )}
        >
          <header className="h-12 flex items-center justify-between text-gray-800">
            <button
              onClick={onClose}
              className="w-12 h-full flex items-center justify-center outline-none"
            >
              <IconCross className="w-6 h-6" />
            </button>

            <span className="text-lg tracking-tightest font-bold">{title}</span>

            <div className="w-12 h-full flex items-center justify-center">
              {rightAction}
            </div>
          </header>

          <div className={className}>{children}</div>
        </RdxDialog.Content>
      </RdxDialog.Portal>
    </RdxDialog.Root>
  );
}
