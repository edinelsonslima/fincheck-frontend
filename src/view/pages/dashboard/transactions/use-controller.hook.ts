import { useParameters } from "@hooks/use-parameters.hook";
import { useTransactionsGet } from "@hooks/use-transactions.hook";
import { ITransactions } from "@interfaces/transactions.interface";
import { intlService } from "@services/intl.service";
import { useState, useRef, useEffect } from "react";

const { intlMonths, t } = intlService;

export function useController() {
  const [isEditModalOpen, setIsModalOpen] = useState(false);
  const [transactionBeingEdited, seTransactionBeingEdited] =
    useState<ITransactions.Entity | null>(null);

  const [parameters, setParameters] = useParameters();

  const isFirstRender = useRef(true);
  const transactions = useTransactionsGet();

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
    transactions: transactions.data ?? [],
    isLoading: transactions.isLoading,
    isInitialLoading: isFirstRender.current
      ? transactions.isInitialLoading
      : false,
  };
}
