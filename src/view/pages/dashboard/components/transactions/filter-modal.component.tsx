import { useState } from "react";
import { intlService } from "../../../../../app/services/intl.service";
import { cn } from "../../../../../app/utils/cn.utils";
import { IconChevronLeft } from "../../../../../assets/icons/chevron-left.icon";
import { IconChevronRight } from "../../../../../assets/icons/chevron-left.right";
import { IconFilter } from "../../../../../assets/icons/filter.icon";
import { Button } from "../../../../components/button.component";
import { Modal } from "../../../../components/modal.component";

interface FilterModalProps {
  onChange(values: { bankAccountId: string; year: number }): void;
}

const MOCK = [
  { id: "01", name: "NuBank" },
  { id: "02", name: "Xp Investimento" },
  { id: "03", name: "Dinheiro" },
  { id: "04", name: "Inter" },
  { id: "05", name: "Banco do Brasil" },
  { id: "06", name: "BTG Pactual" },
];

export function FilterModal({ onChange }: FilterModalProps) {
  const [open, setOpen] = useState(false);
  const [bankAccountId, setBankAccountId] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <IconFilter />
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={intlService.intlTerm("Filters")}
        className="space-y-10 text-gray-800"
      >
        <div className="space-y-2">
          <span className="text-lg tracking-tightest font-bold">
            {intlService.intlTerm("Account")}
          </span>

          {MOCK.map(({ id, name }) => (
            <button
              key={id}
              onClick={() => setBankAccountId(id)}
              className={cn(
                "p-2 rounded-2xl w-full text-left transition-colors hover:bg-gray-50",
                bankAccountId === id && " !bg-gray-200"
              )}
            >
              {name}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <span className="text-lg tracking-tightest font-bold">
            {intlService.intlTerm("Year")}
          </span>

          <div className="w-52 flex items-center justify-between">
            <button
              onClick={() => setYear((prev) => prev - 1)}
              className="w-12 h-12 flex items-center justify-center"
            >
              <IconChevronLeft className="w-6 h-6" />
            </button>

            <span className="flex-1 text-center text-sm font-medium tracking-tighter">
              {year}
            </span>

            <button
              onClick={() => setYear((prev) => prev + 1)}
              className="w-12 h-12 flex items-center justify-center"
            >
              <IconChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <Button
          className="w-full"
          onClick={() => onChange({ bankAccountId, year })}
        >
          {intlService.intlTerm("Apply Filters")}
        </Button>
      </Modal>
    </>
  );
}
