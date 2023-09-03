import { intlCurrency, t } from "../../../../../app/i18n";
import { BankAccountType } from "../../../../components/bank-account-type-icon.component";
import { CategoryIcon } from "../../../../components/category-icon.component";

interface AccountCardProps {
  color: string;
  name: string;
  balance: number;
  type: BankAccountType;
}

export function AccountCard({ balance, color, name }: AccountCardProps) {
  return (
    <div className="relative overflow-hidden p-4 bg-white rounded-2xl h-[12.5rem] flex flex-col justify-between">
      <header>
        <CategoryIcon type="income" />

        <span className="text-gray-800 font-medium tracking-tighter mt-4 block">
          {name}
        </span>
      </header>

      <main>
        <span className="text-gray-800 font-medium tracking-tighter mt-4 block">
          {intlCurrency(balance)}
        </span>

        <small className="text-gray-600 text-sm">{t("Current balance")}</small>
      </main>

      <span
        style={{ background: color }}
        className="absolute h-1 inset-x-0 bottom-0 bg-teal-950"
      />
    </div>
  );
}
