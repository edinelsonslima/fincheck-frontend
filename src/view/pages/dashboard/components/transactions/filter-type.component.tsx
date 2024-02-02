import { intlService } from "../../../../../app/services/intl.service";
import { IconChevronDown } from "../../../../../assets/icons/chevron-down.icon";
import { IconExpenses } from "../../../../../assets/icons/expenses.icon";
import { IconIncome } from "../../../../../assets/icons/income.icon";
import { IconTransactions } from "../../../../../assets/icons/transactions.icon";
import { DropdownMenu } from "../../../../components/dropdown-menu.component";

interface IFilterType {
  onSelect(type?: "INCOME" | "EXPENSE"): void;
  selectedType?: "INCOME" | "EXPENSE";
}

interface IConfig {
  EXPENSE: { name: string; icon: JSX.Element };
  INCOME: { name: string; icon: JSX.Element };
  null: { name: string; icon: JSX.Element };
}

const { intlTerm } = intlService;

const config: IConfig = {
  EXPENSE: {
    name: intlTerm("Expenses"),
    icon: <IconExpenses />,
  },
  INCOME: {
    name: intlTerm("Incomes"),
    icon: <IconIncome />,
  },
  null: {
    name: intlTerm("Transactions"),
    icon: <IconTransactions />,
  },
};

export function FilterType({ onSelect, selectedType }: IFilterType) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-2">
        {config[selectedType as keyof IConfig].icon}

        <span className="text-sm text-gray-800 tracking-tighter font-medium">
          {config[selectedType as keyof IConfig].name}
        </span>

        <IconChevronDown className="text-gray-900" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[17.4375rem] mt-2 ml-12 md:ml-28">
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("INCOME")}
        >
          {config.INCOME.icon}
          {config.INCOME.name}
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("EXPENSE")}
        >
          {config.EXPENSE.icon}
          {config.EXPENSE.name}
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect()}>
          {config.null.icon}
          {config.null.name}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
