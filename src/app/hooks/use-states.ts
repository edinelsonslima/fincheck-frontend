import { useCallback, useState } from "react";

interface IUpdateState<TStates extends object, TKey extends keyof TStates> {
  key: TKey;
  value: TStates[TKey] | ((data: TStates[TKey]) => TStates[TKey]);
}

export function useStates<TStates extends object>(
  initialStates: TStates | (() => TStates)
) {
  const [states, setStates] = useState(initialStates);

  const dispatch = useCallback(function <TKey extends keyof TStates>(
    key: IUpdateState<TStates, TKey>["key"],
    value: IUpdateState<TStates, TKey>["value"]
  ) {
    return setStates((previous) => {
      if (typeof value === "function") {
        const fn = value as (data: TStates[TKey]) => TStates[TKey];
        return { ...previous, [key]: fn(previous[key]) };
      }

      return { ...previous, [key]: value };
    });
  },
  []);

  return [states, dispatch] as const;
}
