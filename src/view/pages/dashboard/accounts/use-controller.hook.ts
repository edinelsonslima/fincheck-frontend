import { useBankAccountGet } from "@hooks/use-bank-account.hook";
import { useWindowSize } from "@hooks/use-window-size";
import { intlService } from "@services/intl.service";
import { useState, useMemo } from "react";
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
    if (windowWidth.sm) {
      return 1.1;
    }

    if (windowWidth.md) {
      return 2.2;
    }

    if (windowWidth.lg) {
      return 1.1;
    }

    if (windowWidth.xl) {
      return 2.1;
    }

    if (windowWidth.xxl) {
      return 3.1;
    }

    return 4.1;
  }, [
    windowWidth.lg,
    windowWidth.md,
    windowWidth.sm,
    windowWidth.xl,
    windowWidth.xxl,
  ]);

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
