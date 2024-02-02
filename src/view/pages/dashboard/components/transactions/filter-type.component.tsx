import { intlService } from "../../../../../app/services/intl.service";
import { IconChevronDown } from "../../../../../assets/icons/chevron-down.icon";
import { IconExpenses } from "../../../../../assets/icons/expenses.icon";
import { IconIncome } from "../../../../../assets/icons/income.icon";
import { IconTransactions } from "../../../../../assets/icons/transactions.icon";
import { DropdownMenu } from "../../../../components/dropdown-menu.component";

interface IFilterType {
  onSelect(type?: "INCOME" | "EXPENSE"): void;
}

const { intlTerm } = intlService;

export function FilterType({ onSelect }: IFilterType) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-2">
        <IconTransactions />
        <span className="text-sm text-gray-800 tracking-tighter font-medium">
          {intlTerm("Transactions")}
        </span>
        <IconChevronDown className="text-gray-900" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="w-[17.4375rem] mt-2 ml-12 md:ml-28">
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("INCOME")}
        >
          <IconIncome />
          {intlTerm("incomes")}
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => onSelect("EXPENSE")}
        >
          <IconExpenses />
          {intlTerm("expenses")}
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2" onSelect={() => onSelect()}>
          <IconTransactions />
          {intlTerm("transactions")}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
