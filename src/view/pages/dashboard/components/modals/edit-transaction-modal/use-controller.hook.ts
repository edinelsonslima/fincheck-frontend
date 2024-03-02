import { z } from "zod";
import { intlService } from "../../../../../../app/services/intl.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccountGetAll } from "../../../../../../app/hooks/use-bank-account.hook";
import { useCategoriesGetAll } from "../../../../../../app/hooks/use-categories.hook";
import { useMemo, useState } from "react";
import {
  useTransactionsDelete,
  useTransactionsUpdate,
} from "../../../../../../app/hooks/use-transactions.hook";
import { enTransactionType } from "../../../../../../types/enums/transaction-type.enum";
import { ITransactions } from "../../../../../../types/interfaces/transactions.interface";
import toast from "react-hot-toast";
import { useCache } from "../../../../../../app/hooks/use-cache.hook";
import { enKeys } from "../../../../../../types/enums/requests-keys.enum";
import { useParameters } from "../../../../../../app/hooks/use-parameters.hook";
import { IBankAccount } from "../../../../../../types/interfaces/bank-account.interface";

const { t } = intlService;

const schema = z.object({
  value: z.number({ required_error: t("Provide the value.") }),
  name: z.string().nonempty(t("Provide the name.")),
  categoryId: z.string().nonempty(t("Provide the category.")),
  bankAccountId: z.string().nonempty(t("Provide the bank account ID.")),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useController(
  transaction: ITransactions.Entity,
  onClose: () => void
) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [parameters] = useParameters();
  const [, setCacheBankAccounts] = useCache<IBankAccount.GetAll.Response>(
    enKeys.bankAccount.getAll
  );
  const [, setCacheTransactions] = useCache<ITransactions.GetAll.Response>(
    enKeys.transactions.getAll({
      month: parameters.month,
      year: parameters.year,
      type: parameters.type,
      bankAccountId: parameters.bankAccountId,
    })
  );

  const bankAccountGetAll = useBankAccountGetAll();
  const transactionsUpdate = useTransactionsUpdate();
  const transactionsDelete = useTransactionsDelete();
  const categoriesGetAll = useCategoriesGetAll();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: transaction.name,
      categoryId: transaction.categoryId,
      bankAccountId: transaction.bankAccountId,
      date: new Date(transaction.date),
      value: transaction.value,
    },
  });

  const categories = useMemo(() => {
    const data = categoriesGetAll.data;
    return data?.filter(({ type }) => type === transaction.type);
  }, [categoriesGetAll.data, transaction.type]);

  const handleSubmit = hookFormSubmit(async (data) => {
    const successMessage = isExpense
      ? "Expense successfully edited!"
      : "Income successfully edited!";

    const errorMessage = isExpense
      ? "Error editing expense!"
      : "Error editing income!";

    try {
      const updatedTransaction = await transactionsUpdate.mutateAsync({
        ...data,
        id: transaction.id,
        type: transaction.type,
        date: data.date.toISOString(),
      });

      reset();
      updateCacheTransactionsEdited(updatedTransaction);
      toast.success(t(successMessage));
      onClose();
    } catch (error) {
      const err = error as ITransactions.Update.Error;
      toast.error(t(err.response?.data.message || errorMessage));
    }
  });

  const handleDeleteTransaction = async () => {
    const successMessage = isExpense
      ? "Expense successfully deleted!"
      : "Income successfully deleted!";

    const errorMessage = isExpense
      ? "Error delete this expense!"
      : "Error delete this income!";

    try {
      await transactionsDelete.mutateAsync(transaction.id);

      toast.success(t(successMessage));
      updateCacheTransactionsDeleted(transaction);
      handleCloseDeleteModal();
    } catch (error) {
      const err = error as IBankAccount.Delete.Error;
      toast.error(t(err.response?.data.message || errorMessage));
    }
  };

  const updateCacheTransactionsEdited = (
    updatedTransaction: ITransactions.Update.Response
  ) => {
    setCacheTransactions((transactions) => {
      if (!transactions) {
        return transactions;
      }

      const transactionIndex = transactions.findIndex(({ id }) => {
        return id === transaction.id;
      });

      if (transactionIndex === -1) {
        return transactions;
      }

      transactions[transactionIndex] = {
        ...transactions[transactionIndex],
        ...updatedTransaction,
      };

      return transactions;
    });

    setCacheBankAccounts((bankAccounts) => {
      if (!bankAccounts) {
        return bankAccounts;
      }

      const bankAccountIndex = bankAccounts.findIndex(({ id }) => {
        return updatedTransaction.bankAccountId === id;
      });

      if (bankAccountIndex === -1) {
        return bankAccounts;
      }

      const { initialBalance, ...bankAccount } = bankAccounts[bankAccountIndex];

      if (updatedTransaction.type === enTransactionType.INCOME) {
        bankAccount.currentBalance = initialBalance + updatedTransaction.value;
      }

      if (updatedTransaction.type === enTransactionType.EXPENSE) {
        bankAccount.currentBalance = initialBalance - updatedTransaction.value;
      }

      bankAccounts[bankAccountIndex] = { ...bankAccount, initialBalance };

      return bankAccounts;
    });
  };

  const updateCacheTransactionsDeleted = (
    deletedTransaction: ITransactions.Update.Response
  ) => {
    setCacheTransactions((transactions) => {
      return transactions?.filter(({ id }) => deletedTransaction.id !== id);
    });

    setCacheBankAccounts((bankAccounts) => {
      if (!bankAccounts) {
        return bankAccounts;
      }

      const bankAccountIndex = bankAccounts.findIndex(({ id }) => {
        return deletedTransaction.bankAccountId === id;
      });

      if (bankAccountIndex === -1) {
        return bankAccounts;
      }

      const { initialBalance, ...bankAccount } = bankAccounts[bankAccountIndex];

      if (deletedTransaction.type === enTransactionType.INCOME) {
        bankAccount.currentBalance = initialBalance + deletedTransaction.value;
      }

      if (deletedTransaction.type === enTransactionType.EXPENSE) {
        bankAccount.currentBalance = initialBalance - deletedTransaction.value;
      }

      bankAccounts[bankAccountIndex] = { ...bankAccount, initialBalance };

      return bankAccounts;
    });
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const isExpense = transaction.type === enTransactionType.EXPENSE;

  return {
    register,
    errors,
    control,
    t,
    handleSubmit,
    isExpense,
    accounts: bankAccountGetAll.data ?? [],
    categories: categories ?? [],
    isLoading: transactionsUpdate.isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    isLoadingDelete: transactionsDelete.isLoading,
  };
}
