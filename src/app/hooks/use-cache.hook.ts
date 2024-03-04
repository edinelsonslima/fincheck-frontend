import {
  QueryKey,
  useQueryClient,
  QueryFilters,
  Updater,
  SetDataOptions,
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
      updater: Updater<TData | undefined, TData | undefined>,
      options?: SetDataOptions
    ) {
      const updaterCache = (data: TData | undefined) => {
        if (updater instanceof Function) {
          return updater(structuredClone(data));
        }

        return updater;
      };

      return queryClient.setQueryData<TData>(key, updaterCache, options);
    },
    [key, queryClient]
  );

  return [getCache, setCache, queryClient] as const;
}
