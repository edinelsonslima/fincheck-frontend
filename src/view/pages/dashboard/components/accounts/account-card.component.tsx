import { useMemo } from "react";
import { intlService } from "../../../../../app/services/intl.service";
import { BankAccountType } from "../../../../components/bank-account-type-icon.component";
import { CategoryIcon } from "../../../../components/category-icon.component";
import { useDashboard } from "../../hook/use-dashboard.hook";
import { Value } from "../value.component";

interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: BankAccountType;
}

export function AccountCard({ balance, color, name }: AccountCardProps) {
  const { intlTerm} = useMemo(() => intlService, []);
  const { areValuesVisible } = useDashboard();
  return (
    <div className="relative overflow-hidden p-4 bg-white rounded-2xl h-[12.5rem] flex flex-col justify-between">
      <header>
        <CategoryIcon type="income" />

        <span className="text-gray-800 font-medium tracking-tighter mt-4 block">
          {name}
        </span>
      </header>

      <main>
        <Value
          value={balance}
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
