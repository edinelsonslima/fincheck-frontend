import { useMemo } from "react";
import { languageService } from "../../../../../app/services/language.service";
import { useDashboard } from "../../hook/use-dashboard.hook";

export function useController() {
  const { t, intlDate, intlMonths } = useMemo(() => languageService, []);
  const { areValuesVisible } = useDashboard();

  return { areValuesVisible, t, intlDate, intlMonths, isLoading: true };
}
