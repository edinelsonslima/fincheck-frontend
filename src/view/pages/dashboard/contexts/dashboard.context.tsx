import { PropsWithChildren, createContext, useCallback, useState } from "react";
import { useLocalStorage } from "../../../../app/hooks/use-local-storage.hook";
import { enLocalStorage } from "../../../../types/enums/local-storage.enum";

interface DashboardContextProps {
  areValuesVisible: boolean;
  toggleValuesVisibility: () => void;

  isNewAccountModalOpen: boolean;
  openNewAccountModal: () => void;
  closeNewAccountModal: () => void;
}

export const DashboardContext = createContext({} as DashboardContextProps);

export function DashboardProvider({ children }: PropsWithChildren) {
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true);
  const [areValuesVisible, setAreValuesVisible] = useLocalStorage(
    enLocalStorage.VALUE_VISIBILITY,
    true
  );

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, [setAreValuesVisible]);

  const openNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, []);

  const closeNewAccountModal = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,
        isNewAccountModalOpen,
        openNewAccountModal,
        closeNewAccountModal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
