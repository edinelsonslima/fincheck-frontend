import { useCallback, useEffect, useState } from "react";

export function useObservable<T = unknown>(key?: string) {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    if (!key) return;

    const handleSetData = (event: Event) => {
      setValue((event as CustomEvent).detail);
    };

    document.addEventListener(key, handleSetData);

    return () => {
      document.removeEventListener(key, handleSetData);
    };
  }, [key]);

  const dispatchObservable = useCallback((key: string, data: unknown) => {
    const event = new CustomEvent(key, { detail: data });
    document.dispatchEvent(event);
  }, []);

  return [value, dispatchObservable] as const;
}
