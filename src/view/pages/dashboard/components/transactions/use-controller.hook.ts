import { useTransactionsGetAll } from "../../../../../app/hooks/use-transactions.hook";
import { intlService } from "../../../../../app/services/intl.service";
import { useDashboard } from "../../hook/use-dashboard.hook";
import { useEffect, useRef } from "react";
import { useParameters } from "../../../../../app/hooks/use-parameters.hook";

const { intlDate, intlMonths, intlTerm } = intlService;

export function useController() {
  const [parameters, setParameters] = useParameters();

  const { areValuesVisible } = useDashboard();

  const isFirstRender = useRef(true);
  const transactionsGetAll = useTransactionsGetAll();

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return {
    areValuesVisible,
    intlTerm,
    intlDate,
    intlMonths,
    parameters,
    setParameters,
    transactions: transactionsGetAll.data ?? [],
    isLoading: transactionsGetAll.isLoading,
    isInitialLoading: isFirstRender.current
      ? transactionsGetAll.isInitialLoading
      : false,
  };
}
