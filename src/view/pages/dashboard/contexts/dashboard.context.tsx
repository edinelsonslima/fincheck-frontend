import { PropsWithChildren, createContext, useCallback } from "react";
import { useLocalStorage } from "../../../../app/hooks/use-local-storage.hook";
import { enLocalStorage } from "../../../../types/enums/local-storage.enum";
import { useReducer } from "../../../../app/hooks/use-reducer";
import { IBankAccount } from "../../../../types/interfaces/bank-account.interface";

type TransactionType = "INCOME" | "EXPENSE";

interface States {
  isNewAccountModalOpen: boolean;
  isEditAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: TransactionType | null;
  accountBeingEdited: IBankAccount.Entity | null;
}

interface DashboardContextProps extends States {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;

  openNewAccountModal(): void;
  closeNewAccountModal(): void;

  closeNewTransactionModal(): void;
  openNewTransactionModal(type: TransactionType): void;

  openEditAccountModal(bankAccount: IBankAccount.Entity): void;
  closeEditAccountModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextProps);

export function DashboardProvider({ children }: PropsWithChildren) {
  const [states, dispatch] = useReducer<States>({
    isNewAccountModalOpen: false,
    isEditAccountModalOpen: false,
    isNewTransactionModalOpen: false,
    accountBeingEdited: null,
    newTransactionType: null,
  });

  const [areValuesVisible, setAreValuesVisible] = useLocalStorage(
    enLocalStorage.VALUE_VISIBILITY,
    true
  );

  const toggleValuesVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, [setAreValuesVisible]);

  const openNewAccountModal = useCallback(() => {
    dispatch({ action: "isNewAccountModalOpen", value: true });
  }, []);

  const closeNewAccountModal = useCallback(() => {
    dispatch({ action: "isNewAccountModalOpen", value: false });
  }, []);

  const openEditAccountModal = useCallback(
    (bankAccount: IBankAccount.Entity) => {
      dispatch({ action: "isEditAccountModalOpen", value: true });
      dispatch({ action: "accountBeingEdited", value: bankAccount });
    },
    []
  );

  const closeEditAccountModal = useCallback(() => {
    dispatch({ action: "isEditAccountModalOpen", value: false });
    dispatch({ action: "accountBeingEdited", value: null });
  }, []);

  const openNewTransactionModal = useCallback((type: TransactionType) => {
    dispatch({ action: "newTransactionType", value: type });
    dispatch({ action: "isNewTransactionModalOpen", value: true });
  }, []);

  const closeNewTransactionModal = useCallback(() => {
    dispatch({ action: "newTransactionType", value: null });
    dispatch({ action: "isNewTransactionModalOpen", value: false });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        areValuesVisible,
        toggleValuesVisibility,

        openNewAccountModal,
        closeNewAccountModal,

        openNewTransactionModal,
        closeNewTransactionModal,

        closeEditAccountModal,
        openEditAccountModal,

        ...states,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
