import { CategoryIcon } from "@components/category-icon.component";
import { enTransactionType } from "@enums/transaction-type.enum";
import { ITransactions } from "@interfaces/transactions.interface";
import { intlService } from "@services/intl.service";
import { cn } from "@utils/cn.utils";
import { Value } from "../value.component";

interface ICardTransaction {
  transaction: ITransactions.Entity;
  onClick: () => void;
}

const { intlDate } = intlService;

export function TransactionCard({ transaction, onClick }: ICardTransaction) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative overflow-hidden w-full bg-white p-4 rounded-2xl flex sm:items-center justify-between flex-col sm:flex-row gap-4 hover:shadow-sm transition-all text-start"
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

      <span
        style={{ background: transaction.bankAccount?.color }}
        className="absolute w-1 inset-y-0 left-0 bg-teal-950"
      />
    </button>
  );
}
