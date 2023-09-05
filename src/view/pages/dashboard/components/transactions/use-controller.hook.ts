import { intlService } from "../../../../../app/services/intl.service";
import { useDashboard } from "../../hook/use-dashboard.hook";

export function useController() {
  const { areValuesVisible } = useDashboard();

  return {
    areValuesVisible,
    intlTerm: intlService.intlTerm,
    intlDate: intlService.intlDate,
    intlMonths: intlService.intlMonths,
    transactions: [],
    isInitialLoading: false,
    isLoading: false,
  };
}
