import { useState } from "react";
import { intlService } from "../../../../../app/services/intl.service";
import { cn } from "../../../../../app/utils/cn.utils";
import { IconChevronLeft } from "../../../../../assets/icons/chevron-left.icon";
import { IconChevronRight } from "../../../../../assets/icons/chevron-right.icon";
import { IconFilter } from "../../../../../assets/icons/filter.icon";
import { Button } from "../../../../components/button.component";
import { Modal } from "../../../../components/modal.component";
import { useParameters } from "../../../../../app/hooks/use-parameters.hook";
import { useQueryClient } from "@tanstack/react-query";
import { enKeys } from "../../../../../types/enums/requests-keys.enum";
import { IBankAccount } from "../../../../../types/interfaces/bank-account.interface";

const { intlTerm } = intlService;

export function FilterModal() {
  const queryClient = useQueryClient();

  const [parameters, setParameter] = useParameters();
  const [open, setOpen] = useState(false);
  const [year, setYear] = useState(parameters.year);
  const [bankAccountId, setBankAccountId] = useState(parameters.bankAccountId);

  const accountsKey = enKeys.bankAccount.getAll;

  return (
    <>
      <button onClick={() => setOpen(true)}>
        <IconFilter />
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={intlTerm("Filters")}
        className="space-y-10 text-gray-800"
      >
        <div className="space-y-2">
          <span className="text-lg tracking-tightest font-bold">
            {intlTerm("Account")}
          </span>

          {queryClient
            .getQueryData<IBankAccount.GetAll.Response>(accountsKey)
            ?.map(({ id, name }) => (
              <button
                key={id}
                onClick={() =>
                  setBankAccountId((prevId) => (id === prevId ? undefined : id))
                }
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
            {intlTerm("Year")}
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
          onClick={() => {
            setParameter("bankAccountId", bankAccountId);
            setParameter("year", year);
          }}
        >
          {intlTerm("Apply Filters")}
        </Button>
      </Modal>
    </>
  );
}
