import { useCallback, useState } from "react";
import { useObservable } from "./use-observable.hook";

export function useLocalStorage<T = unknown>(key: string, initialValue: T) {
  const [, dispatchObservable] = useObservable();

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((val: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (typeof window !== "undefined") {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          dispatchObservable(key, valueToStore);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [dispatchObservable, key, storedValue]
  );

  const remove = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key);
        setStoredValue(initialValue);

        dispatchObservable(key, undefined);
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, initialValue, dispatchObservable]);

  return [storedValue, setValue, remove] as const;
}
