import { useSearchParams } from "react-router-dom";
import { useTransactionsGetAll } from "../../../../../app/hooks/use-transactions.hook";
import { intlService } from "../../../../../app/services/intl.service";
import { useDashboard } from "../../hook/use-dashboard.hook";
import { useEffect, useRef } from "react";
import { ITransactions } from "../../../../../types/interfaces/transactions.interface";

interface IFilters extends ITransactions.GetAll.Params {}

const { intlDate, intlMonths, intlTerm } = intlService;

export function useController() {
  const isFirstRender = useRef(true);
  const { areValuesVisible } = useDashboard();

  const [searchParams, setSearchParams] = useSearchParams({
    month: String(new Date().getMonth()),
    year: String(new Date().getFullYear()),
  });

  const getFilter = <T extends keyof IFilters>(key: T) => {
    return searchParams.get(key) as IFilters[T];
  };

  const transactionsGetAll = useTransactionsGetAll({
    month: getFilter("month"),
    year: getFilter("year"),
    type: getFilter("type"),
    bankAccountId: getFilter("bankAccountId"),
  });

  const handleChangeFilter = <T extends keyof IFilters>(
    filter: T,
    value: IFilters[T]
  ) => {
    const invalidValues = [undefined, null, ""];

    if (invalidValues.includes(value as undefined)) {
      return setSearchParams((params) => {
        params.delete(filter);
        return params;
      });
    }

    setSearchParams((params) => {
      params.set(filter, String(value));
      return params;
    });
  };

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
    getFilter,
    handleChangeFilter,
    transactions: transactionsGetAll.data ?? [],
    isLoading: transactionsGetAll.isLoading,
    isInitialLoading: isFirstRender.current
      ? transactionsGetAll.isInitialLoading
      : false,
  };
}
