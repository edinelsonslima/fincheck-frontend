import { intlService } from "../../../app/services/intl.service";
import { IconBankAccount } from "../../../assets/icons/bank-account.icon";
import { IconPlus } from "../../../assets/icons/plus.icon";
import { enTransactionType } from "../../../types/enums/transaction-type.enum";
import { CategoryIcon } from "../../components/category-icon.component";
import { DropdownMenu } from "../../components/dropdown-menu.component";
import { useDashboard } from "./use-controller.hook";

const { t } = intlService;

export function Fab() {
  const { openNewAccountModal, openNewTransactionModal } = useDashboard();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="fixed right-4 bottom-4 bg-teal-900 w-12 h-12 rounded-full flex items-center justify-center">
        <IconPlus className="text-white w-6 h-6" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className="mb-2 mr-6">
        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => openNewTransactionModal(enTransactionType.EXPENSE)}
        >
          <CategoryIcon type={enTransactionType.EXPENSE} />
          {t("New expense")}
        </DropdownMenu.Item>

        <DropdownMenu.Item
          className="gap-2"
          onSelect={() => openNewTransactionModal(enTransactionType.INCOME)}
        >
          <CategoryIcon type={enTransactionType.INCOME} />
          {t("New income")}
        </DropdownMenu.Item>

        <DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
          <IconBankAccount />
          {t("New account")}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
