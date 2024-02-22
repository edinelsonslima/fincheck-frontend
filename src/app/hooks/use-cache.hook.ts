import {
  QueryFilters,
  QueryKey,
  SetDataOptions,
  Updater,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback } from "react";

export function useCache<TData>(key: QueryKey) {
  const queryClient = useQueryClient();

  const getCache = useCallback(
    function (filters?: QueryFilters) {
      return queryClient.getQueryData<TData>(key, filters);
    },
    [key, queryClient]
  );

  const setCache = useCallback(
    function (
      updaterCache: Updater<TData | undefined, TData | undefined>,
      options?: SetDataOptions
    ) {
      return queryClient.setQueryData<TData>(key, updaterCache, options);
    },
    [key, queryClient]
  );

  return [getCache, setCache, queryClient] as const;
}
