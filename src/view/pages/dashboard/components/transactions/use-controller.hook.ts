import { intlService } from "../../../../../app/services/intl.service";
import { useDashboard } from "../../hook/use-dashboard.hook";

const { intlDate, intlMonths, intlTerm } = intlService;
export function useController() {
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
