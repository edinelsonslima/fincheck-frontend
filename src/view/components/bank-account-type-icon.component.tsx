import { enBankAccountType } from "@enums/bank-account-type.enum";
import { IconCash } from "@icons/cash.icon";
import { IconChecking } from "@icons/checking.icon";
import { IconInvestment } from "@icons/investment.icon";

const iconsMap = {
  [enBankAccountType.CHECKING]: IconChecking,
  [enBankAccountType.INVESTMENT]: IconInvestment,
  [enBankAccountType.CASH]: IconCash,
};

interface IBankAccountTypeIconProps {
  type: keyof typeof enBankAccountType;
}

export function BankAccountTypeIcon({ type }: IBankAccountTypeIconProps) {
  const Icon = iconsMap[type];
  return <Icon />;
}
