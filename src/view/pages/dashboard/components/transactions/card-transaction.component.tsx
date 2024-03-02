import { intlService } from "../../../../../app/services/intl.service";
import { cn } from "../../../../../app/utils/cn.utils";
import { enTransactionType } from "../../../../../types/enums/transaction-type.enum";
import { ITransactions } from "../../../../../types/interfaces/transactions.interface";
import { CategoryIcon } from "../../../../components/category-icon.component";
import { Value } from "../value.component";

interface ICardTransaction {
  transaction: ITransactions.Entity;
  onClick: () => void;
}

const { intlDate } = intlService;

export function CardTransaction({ transaction, onClick }: ICardTransaction) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-white p-4 rounded-2xl flex items-center justify-between gap-4 hover:shadow-sm transition-all"
    >
      <div className="flex flex-1 items-center gap-2">
        <CategoryIcon
          type={transaction.type}
          category={transaction.category?.icon}
        />

        <div>
          <strong className="block font-bold">{transaction.name}</strong>
          <span className="text-sm text-gray-600">
            {intlDate(new Date(transaction.date))}
          </span>
        </div>
      </div>
      <span
        className={cn(
          "tracking-tighter font-medium",
          transaction.type === enTransactionType.EXPENSE && "text-red-800",
          transaction.type === enTransactionType.INCOME && "text-green-800"
        )}
      >
        {transaction.type === enTransactionType.EXPENSE ? "- " : "+ "}
        <Value value={transaction.value} blur="sm" />
      </span>
    </button>
  );
}
