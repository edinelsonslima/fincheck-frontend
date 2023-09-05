import { PropsWithChildren, createContext, useCallback } from "react";
import { useLocalStorage } from "../../../../app/hooks/use-local-storage.hook";
import { enLocalStorage } from "../../../../types/enums/local-storage.enum";

interface DashboardContextProps {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;
}

export const DashboardContext = createContext<DashboardContextProps>({
  areValuesVisible: true,
  toggleValuesVisibility: () => {},
});

export function DashboardProvider({ children }: PropsWithChildren) {
  const [areValuesVisible, setAreValuesVisible] = useLocalStorage(
    enLocalStorage.VALUE_VISIBILITY,
    true
  );

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, [setAreValuesVisible]);

  return (
    <DashboardContext.Provider
      value={{ areValuesVisible, toggleValuesVisibility }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
