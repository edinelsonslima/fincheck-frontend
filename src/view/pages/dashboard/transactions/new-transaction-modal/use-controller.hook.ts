import { z } from "zod";
import { intlService } from "../../../../../app/services/intl.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccountGet } from "../../../../../app/hooks/use-bank-account.hook";
import { useCategoriesGet } from "../../../../../app/hooks/use-categories.hook";
import { useMemo } from "react";
import { useTransactionsCreate } from "../../../../../app/hooks/use-transactions.hook";
import toast from "react-hot-toast";
import { ITransactions } from "../../../../../types/interfaces/transactions.interface";
import { enTransactionType } from "../../../../../types/enums/transaction-type.enum";
import { enKeys } from "../../../../../types/enums/requests-keys.enum";
import { IBankAccount } from "../../../../../types/interfaces/bank-account.interface";
import { useParameters } from "../../../../../app/hooks/use-parameters.hook";
import { useCache } from "../../../../../app/hooks/use-cache.hook";
import { useDashboard } from "../../use-controller.hook";

const { t } = intlService;

const schema = z.object({
  value: z.number({ required_error: t("Provide the value.") }),
  name: z.string().nonempty(t("Provide the name.")),
  categoryId: z.string().nonempty(t("Provide the category.")),
  bankAccountId: z.string().nonempty(t("Provide the bank account ID.")),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const [parameters] = useParameters();
  const [getBankAccounts, setCacheBankAccounts] =
    useCache<IBankAccount.Get.Response>(enKeys.bankAccount.get);
  const [, setCacheTransactions] = useCache<ITransactions.Get.Response>(
    enKeys.transactions.get({
      month: parameters.month,
      year: parameters.year,
      type: parameters.type,
      bankAccountId: parameters.bankAccountId,
    })
  );

  const bankAccounts = useBankAccountGet();
  const transactionsCreate = useTransactionsCreate();
  const categories = useCategoriesGet();

  const isExpense = newTransactionType === enTransactionType.EXPENSE;

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      categoryId: "",
      date: new Date(),
      bankAccountId: "",
    },
  });

  const updateCacheTransactions = (
    transaction: ITransactions.Create.Response
  ) => {
    const bankAccount = getBankAccounts()?.find(({ id }) => {
      return transaction.bankAccountId === id;
    });

    setCacheTransactions((transactions) => {
      return transactions?.concat({
        ...transaction,
        ...(bankAccount && { bankAccount: { color: bankAccount?.color } }),
      });
    });
  };

  const updateCacheBankAccounts = (
    transaction: ITransactions.Create.Response
  ) => {
    setCacheBankAccounts((bankAccounts) => {
      if (!bankAccounts) {
        return bankAccounts;
      }

      const matchedBankAccountIndex = bankAccounts?.findIndex(({ id }) => {
        return transaction.bankAccountId === id;
      });

      if (matchedBankAccountIndex === -1) {
        return bankAccounts;
      }

      const editedBankAccount = bankAccounts[matchedBankAccountIndex];

      if (transaction.type === enTransactionType.EXPENSE) {
        editedBankAccount.currentBalance -= transaction.value;
      }

      if (transaction.type === enTransactionType.INCOME) {
        editedBankAccount.currentBalance += transaction.value;
      }

      bankAccounts[matchedBankAccountIndex] = editedBankAccount;

      return bankAccounts;
    });
  };

  const handleSubmit = hookFormSubmit(async (data) => {
    const successMessage = isExpense
      ? "Expense successfully registered!"
      : "Income successfully registered!";

    const errorMessage = isExpense
      ? "Error registering expense!"
      : "Error registering income!";

    try {
      const newTransaction = await transactionsCreate.mutateAsync({
        ...data,
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      reset();
      updateCacheTransactions(newTransaction);
      updateCacheBankAccounts(newTransaction);
      toast.success(t(successMessage));
      closeNewTransactionModal();
    } catch (error) {
      const err = error as ITransactions.Create.Error;
      toast.error(t(err.response?.data.message || errorMessage));
    }
  });

  const categoriesFiltered = useMemo(() => {
    return categories.data?.filter(({ type }) => type === newTransactionType);
  }, [categories.data, newTransactionType]);

  return {
    register,
    errors,
    control,
    t,
    isExpense,
    handleSubmit,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    accounts: bankAccounts.data ?? [],
    categories: categoriesFiltered ?? [],
    isLoading: transactionsCreate.isLoading,
  };
}
