import { enLocalStorage } from "@enums/local-storage.enum";
import { enTransactionType } from "@enums/transaction-type.enum";
import { useLocalStorage } from "@hooks/use-local-storage.hook";
import { useStates } from "@hooks/use-states";
import { IBankAccount } from "@interfaces/bank-account.interface";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react";

interface IStates {
  isNewAccountModalOpen: boolean;
  isEditAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: enTransactionType | null;
  accountBeingEdited: IBankAccount.Entity | null;
}

interface IDashboardContextProps extends IStates {
  areValuesVisible: boolean;
  toggleValuesVisibility(): void;

  openNewAccountModal(): void;
  closeNewAccountModal(): void;

  closeNewTransactionModal(): void;
  openNewTransactionModal(type: enTransactionType): void;

  openEditAccountModal(bankAccount: IBankAccount.Entity): void;
  closeEditAccountModal(): void;
}

export const DashboardContext = createContext({} as IDashboardContextProps);

export function DashboardProvider({ children }: PropsWithChildren) {
  const [states, dispatch] = useStates<IStates>({
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
    dispatch("isNewAccountModalOpen", true);
  }, [dispatch]);

  const closeNewAccountModal = useCallback(() => {
    dispatch("isNewAccountModalOpen", false);
  }, [dispatch]);

  const openEditAccountModal = useCallback(
    (bankAccount: IBankAccount.Entity) => {
      dispatch("isEditAccountModalOpen", true);
      dispatch("accountBeingEdited", bankAccount);
    },
    [dispatch]
  );

  const closeEditAccountModal = useCallback(() => {
    dispatch("isEditAccountModalOpen", false);
    dispatch("accountBeingEdited", null);
  }, [dispatch]);

  const openNewTransactionModal = useCallback(
    (type: enTransactionType) => {
      dispatch("newTransactionType", type);
      dispatch("isNewTransactionModalOpen", true);
    },
    [dispatch]
  );

  const closeNewTransactionModal = useCallback(() => {
    dispatch("newTransactionType", null);
    dispatch("isNewTransactionModalOpen", false);
  }, [dispatch]);

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

export function useDashboard() {
  return useContext(DashboardContext);
}
