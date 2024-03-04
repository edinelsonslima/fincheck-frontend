import { CategoryIcon } from "@components/category-icon.component";
import { IBankAccount } from "@interfaces/bank-account.interface";
import { intlService } from "@services/intl.service";
import { useDashboard } from "../use-controller.hook";
import { Value } from "../value.component";

interface IAccountCardProps {
  data: IBankAccount.Entity;
}

const { t } = intlService;

export function AccountCard({ data }: IAccountCardProps) {
  const { name, currentBalance, color } = data;
  const { openEditAccountModal } = useDashboard();

  return (
    <button
      className="w-full relative overflow-hidden p-4 bg-white rounded-2xl h-[12.5rem] flex flex-col justify-between text-start"
      onClick={() => openEditAccountModal(data)}
    >
      <header>
        <CategoryIcon type="INCOME" />

        <span className="text-gray-800 font-medium tracking-tighter mt-4 block">
          {name}
        </span>
      </header>

      <main>
        <Value
          value={currentBalance}
          blur="sm"
          className="text-gray-800 font-medium tracking-tighter mt-4 block"
        />

        <small className="text-gray-600 text-sm">{t("Current balance")}</small>
      </main>

      <span
        style={{ background: color }}
        className="absolute h-1 inset-x-0 bottom-0 bg-teal-950"
      />
    </button>
  );
}
