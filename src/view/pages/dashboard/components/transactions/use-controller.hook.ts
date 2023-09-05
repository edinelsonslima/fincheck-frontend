import { useMemo } from "react";
import { intlService } from "../../../../../app/services/intl.service";
import { useDashboard } from "../../hook/use-dashboard.hook";

export function useController() {
  const { intlTerm, intlDate, intlMonths } = useMemo(() => intlService, []);
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    intlTerm,
    intlDate,
    intlMonths,
    transactions: [],
    isInitialLoading: false,
    isLoading: false,
  };
}
