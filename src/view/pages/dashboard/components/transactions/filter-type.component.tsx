import { intlService } from "../../../../../app/services/intl.service";
import { IconChevronDown } from "../../../../../assets/icons/chevron-down.icon";
import { IconExpenses } from "../../../../../assets/icons/expenses.icon";
import { IconIncome } from "../../../../../assets/icons/income.icon";
import { IconTransactions } from "../../../../../assets/icons/transactions.icon";
import { enTransactionType } from "../../../../../types/enums/transaction-type.enum";
import { DropdownMenu } from "../../../../components/dropdown-menu.component";
import { useParameters } from "../../../../../app/hooks/use-parameters.hook";

interface IConfig {
  [enTransactionType.EXPENSE]: { name: string; icon: JSX.Element };
  [enTransactionType.INCOME]: { name: string; icon: JSX.Element };
  transactions: { name: string; icon: JSX.Element };
}

const { intlTerm } = intlService;

const config: IConfig = {
  [enTransactionType.EXPENSE]: {
    name: intlTerm("Expenses"),
    icon: <IconExpenses />,
  },
  [enTransactionType.INCOME]: {
    name: intlTerm("Incomes"),
    icon: <IconIncome />,
  },
  transactions: {
    name: intlTerm("Transactions"),
    icon: <IconTransactions />,
  },
};

export function FilterType() {
  const [parameters, setParameters] = useParameters();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-2">
        {config[parameters?.type ?? "transactions"].icon}

        <span className="text-sm text-gray-800 tracking-tighter font-medium">
          {config[parameters?.type ?? "transactions"].name}
        </span>

        <IconChevronDown className="text-gray-900" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[17.4375rem] mt-2 ml-12 md:ml-28">
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => setParameters("type", enTransactionType.INCOME)}
        >
          {config.INCOME.icon}
          {config.INCOME.name}
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => setParameters("type", enTransactionType.EXPENSE)}
        >
          {config.EXPENSE.icon}
          {config.EXPENSE.name}
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => setParameters("type", null)}
        >
          {config.transactions.icon}
          {config.transactions.name}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
