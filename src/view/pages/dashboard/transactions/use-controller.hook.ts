import { useTransactionsGetAll } from "../../../../app/hooks/use-transactions.hook";
import { intlService } from "../../../../app/services/intl.service";
import { useEffect, useRef, useState } from "react";
import { useParameters } from "../../../../app/hooks/use-parameters.hook";
import { ITransactions } from "../../../../types/interfaces/transactions.interface";

const { intlMonths, t } = intlService;

export function useController() {
  const [isEditModalOpen, setIsModalOpen] = useState(false);
  const [transactionBeingEdited, seTransactionBeingEdited] =
    useState<ITransactions.Entity | null>(null);

  const [parameters, setParameters] = useParameters();

  const isFirstRender = useRef(true);
  const transactionsGetAll = useTransactionsGetAll();

  function handleOpenEditModal(transaction: ITransactions.Entity) {
    setIsModalOpen(true);
    seTransactionBeingEdited(transaction);
  }

  function handleCloseEditModal() {
    setIsModalOpen(false);
    seTransactionBeingEdited(null);
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, []);

  return {
    t,
    intlMonths,
    parameters,
    setParameters,
    transactionBeingEdited,
    isEditModalOpen,
    handleCloseEditModal,
    handleOpenEditModal,
    transactions: transactionsGetAll.data ?? [],
    isLoading: transactionsGetAll.isLoading,
    isInitialLoading: isFirstRender.current
      ? transactionsGetAll.isInitialLoading
      : false,
  };
}
