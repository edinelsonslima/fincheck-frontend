import { IconCash } from "../../assets/icons/cash.icon";
import { IconChecking } from "../../assets/icons/checking.icon";
import { IconInvestment } from "../../assets/icons/investment.icon";

const iconsMap = {
  CHECKING: IconChecking,
  INVESTMENT: IconInvestment,
  CASH: IconCash,
};

export type BankAccountType = keyof typeof iconsMap;

interface BankAccountTypeIconProps {
  type: BankAccountType;
}

export function BankAccountTypeIcon({ type }: BankAccountTypeIconProps) {
  const Icon = iconsMap[type];
  return <Icon />;
}
