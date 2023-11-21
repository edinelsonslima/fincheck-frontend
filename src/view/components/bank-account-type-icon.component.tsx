import { IconCash } from "../../assets/icons/cash.icon";
import { IconChecking } from "../../assets/icons/checking.icon";
import { IconInvestment } from "../../assets/icons/investment.icon";
import { enBankAccountType } from "../../types/enums/bank-account-type.enum";

const iconsMap = {
  [enBankAccountType.CHECKING]: IconChecking,
  [enBankAccountType.INVESTMENT]: IconInvestment,
  [enBankAccountType.CASH]: IconCash,
};

interface BankAccountTypeIconProps {
  type: keyof typeof enBankAccountType;
}

export function BankAccountTypeIcon({ type }: BankAccountTypeIconProps) {
  const Icon = iconsMap[type];
  return <Icon />;
}
