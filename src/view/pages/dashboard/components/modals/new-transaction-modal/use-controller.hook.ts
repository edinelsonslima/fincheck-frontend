import { z } from "zod";
import { intlService } from "../../../../../../app/services/intl.service";
import { useDashboard } from "../../../hook/use-dashboard.hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccountGetAll } from "../../../../../../app/hooks/use-bank-account.hook";
import { useCategoriesGetAll } from "../../../../../../app/hooks/use-categories.hook";
import { useMemo } from "react";
import { useTransactionsCreate } from "../../../../../../app/hooks/use-transactions.hook";
import toast from "react-hot-toast";
import { ITransactions } from "../../../../../../types/interfaces/transactions.interface";
import { enTransactionType } from "../../../../../../types/enums/transaction-type.enum";
import { enKeys } from "../../../../../../types/enums/requests-keys.enum";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { IBankAccount } from "../../../../../../types/interfaces/bank-account.interface";

const { intlCurrency, intlTerm } = intlService;

const schema = z.object({
  value: z.number({ required_error: intlTerm("Provide the value.") }),
  name: z.string().nonempty(intlTerm("Provide the name.")),
  categoryId: z.string().nonempty(intlTerm("Provide the category.")),
  bankAccountId: z.string().nonempty(intlTerm("Provide the bank account ID.")),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useController() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();
  const { currencySymbol } = intlCurrency(0);

  const [searchParams] = useSearchParams();

  const bankAccountGetAll = useBankAccountGetAll();
  const transactionsCreate = useTransactionsCreate();
  const categoriesGetAll = useCategoriesGetAll();
  const queryClient = useQueryClient();
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
    queryClient.setQueryData<ITransactions.GetAll.Response>(
      enKeys.transactions.getAll({
        month: Number(searchParams.get("month")),
        year: Number(searchParams.get("year")),
      }),
      (currentTransactions) => {
        return currentTransactions?.concat(transaction);
      }
    );
  };

  const updateCacheBankAccounts = (
    transaction: ITransactions.Create.Response
  ) => {
    queryClient.setQueriesData<IBankAccount.GetAll.Response>(
      enKeys.bankAccount.getAll,
      (currentBankAccounts) => {
        if (!currentBankAccounts) {
          return currentBankAccounts;
        }

        const matchedBankAccountIndex = currentBankAccounts?.findIndex(
          ({ id }) => transaction.bankAccountId === id
        );

        if (matchedBankAccountIndex === -1) {
          return currentBankAccounts;
        }

        const editedBankAccount = currentBankAccounts[matchedBankAccountIndex];

        currentBankAccounts[matchedBankAccountIndex] = {
          ...editedBankAccount,
          currentBalance:
            transaction.type === "EXPENSE"
              ? editedBankAccount.currentBalance - transaction.value
              : editedBankAccount.currentBalance + transaction.value,
        };

        return currentBankAccounts;
      }
    );
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
      toast.success(intlTerm(successMessage));
      closeNewTransactionModal();
    } catch (error) {
      const err = error as ITransactions.Create.Error;
      toast.error(intlTerm(err.response?.data.message || errorMessage));
    }
  });

  const categories = useMemo(() => {
    return categoriesGetAll.data?.filter(
      ({ type }) => type === newTransactionType
    );
  }, [categoriesGetAll.data, newTransactionType]);

  return {
    register,
    errors,
    control,
    intlTerm,
    isExpense,
    currencySymbol,
    handleSubmit,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    accounts: bankAccountGetAll.data ?? [],
    categories: categories ?? [],
    isLoading: transactionsCreate.isLoading,
  };
}
