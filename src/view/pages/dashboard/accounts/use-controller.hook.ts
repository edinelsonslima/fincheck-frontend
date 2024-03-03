import { useMemo, useState } from "react";
import { useWindowSize } from "../../../../app/hooks/use-window-size";
import { intlService } from "../../../../app/services/intl.service";
import { useBankAccountGet } from "../../../../app/hooks/use-bank-account.hook";
import { useDashboard } from "../use-controller.hook";

const { t } = intlService;

export function useController() {
  const { areValuesVisible, toggleValuesVisibility, openNewAccountModal } =
    useDashboard();

  const [windowWidth] = useWindowSize();
  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const bankAccounts = useBankAccountGet();

  const slidesPerView = useMemo(() => {
    const isLess = (width: number) => windowWidth.width <= width;
    return isLess(500) ? 1.1 : windowWidth.md ? 2.1 : isLess(900) ? 1.1 : 2.1;
  }, [windowWidth.md, windowWidth.width]);

  const currentBalance = useMemo(() => {
    const balance = bankAccounts.data?.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    return balance ?? 0;
  }, [bankAccounts.data]);

  return {
    sliderState,
    setSliderState,
    slidesPerView,
    areValuesVisible,
    toggleValuesVisibility,
    openNewAccountModal,
    t,
    isLoading: bankAccounts.isFetching,
    accounts: bankAccounts.data ?? [],
    currentBalance,
  };
}
