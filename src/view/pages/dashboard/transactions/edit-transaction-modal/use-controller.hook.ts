import { z } from "zod";
import { intlService } from "../../../../../app/services/intl.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccountGet } from "../../../../../app/hooks/use-bank-account.hook";
import { useCategoriesGet } from "../../../../../app/hooks/use-categories.hook";
import { useMemo, useState } from "react";
import {
  useTransactionsDelete,
  useTransactionsUpdate,
} from "../../../../../app/hooks/use-transactions.hook";
import { enTransactionType } from "../../../../../types/enums/transaction-type.enum";
import { ITransactions } from "../../../../../types/interfaces/transactions.interface";
import toast from "react-hot-toast";
import { IBankAccount } from "../../../../../types/interfaces/bank-account.interface";

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

  const bankAccounts = useBankAccountGet();
  const transactionsUpdate = useTransactionsUpdate();
  const transactionsDelete = useTransactionsDelete();
  const categories = useCategoriesGet();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: transaction.name,
      categoryId: transaction.categoryId,
      bankAccountId: transaction.bankAccountId,
      date: new Date(transaction.date),
      value: transaction.value,
    },
  });

  const categoriesFiltered = useMemo(() => {
    return categories.data?.filter(({ type }) => type === transaction.type);
  }, [categories.data, transaction.type]);

  const handleSubmit = form.handleSubmit((data) => {
    const successMessage = isExpense
      ? "Expense successfully edited!"
      : "Income successfully edited!";

    const errorMessage = isExpense
      ? "Error editing expense!"
      : "Error editing income!";

    const transactionFactory = {
      ...data,
      id: transaction.id,
      type: transaction.type,
      date: data.date.toISOString(),
    };

    const handleSuccess = () => {
      toast.success(t(successMessage));
      form.reset();
      onClose();
    };

    const handleError = (error: ITransactions.Update.Error) => {
      toast.error(t(error.response?.data.message || errorMessage));
    };

    transactionsUpdate
      .mutateAsync(transactionFactory)
      .then(handleSuccess)
      .catch(handleError);
  });

  const handleDeleteTransaction = () => {
    const successMessage = isExpense
      ? "Expense successfully deleted!"
      : "Income successfully deleted!";

    const errorMessage = isExpense
      ? "Error delete this expense!"
      : "Error delete this income!";

    const handleSuccess = () => {
      toast.success(t(successMessage));
      handleCloseDeleteModal();
      onClose();
    };

    const handleError = (error: IBankAccount.Delete.Error) => {
      toast.error(t(error.response?.data.message || errorMessage));
    };

    transactionsDelete
      .mutateAsync(transaction.id)
      .then(handleSuccess)
      .catch(handleError);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const isExpense = transaction.type === enTransactionType.EXPENSE;

  return {
    t,
    isExpense,
    handleSubmit,
    register: form.register,
    errors: form.formState.errors,
    control: form.control,
    accounts: bankAccounts.data ?? [],
    categories: categoriesFiltered ?? [],
    isLoading: transactionsUpdate.isLoading,
    isDeleteModalOpen,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteTransaction,
    isLoadingDelete: transactionsDelete.isLoading,
  };
}
