import { intlService } from "../../../../../app/services/intl.service";
import { IBankAccount } from "../../../../../types/interfaces/bank-account.interface";
import { CategoryIcon } from "../../../../components/category-icon.component";
import { useDashboard } from "../../hook/use-dashboard.hook";
import { Value } from "../value.component";

interface IAccountCardProps {
  data: IBankAccount.Entity;
}

const { intlTerm } = intlService;

export function AccountCard({ data }: IAccountCardProps) {
  const { name, currentBalance, color } = data;
  const { areValuesVisible, openEditAccountModal } = useDashboard();
  return (
    <div
      className="relative overflow-hidden p-4 bg-white rounded-2xl h-[12.5rem] flex flex-col justify-between"
      role="button"
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
          visible={areValuesVisible}
          blur="sm"
          className="text-gray-800 font-medium tracking-tighter mt-4 block"
        />

        <small className="text-gray-600 text-sm">
          {intlTerm("Current balance")}
        </small>
      </main>

      <span
        style={{ background: color }}
        className="absolute h-1 inset-x-0 bottom-0 bg-teal-950"
      />
    </div>
  );
}
