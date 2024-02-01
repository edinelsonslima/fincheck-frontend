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
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useTransactionsCreate();
  const { data: accounts } = useBankAccountGetAll();
  const { data: categoriesList } = useCategoriesGetAll();

  const [searchParams] = useSearchParams();

  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();

  const { currencySymbol } = intlCurrency(0);
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

  const handleSubmit = hookFormSubmit(async (data) => {
    const successMessage = isExpense
      ? "Expense successfully registered!"
      : "Income successfully registered!";

    const errorMessage = isExpense
      ? "Error registering expense!"
      : "Error registering income!";

    try {
      const newTransaction = await mutateAsync({
        ...data,
        type: newTransactionType!,
        date: data.date.toISOString(),
      });

      const queryKey = enKeys.transactions.getAll({
        month: Number(searchParams.get("month")),
        year: Number(searchParams.get("year")),
      });

      queryClient.setQueryData<ITransactions.GetAll.Response>(
        queryKey,
        (currentTransactions) => currentTransactions?.concat(newTransaction)
      );

      toast.success(intlTerm(successMessage));
      reset();
      closeNewTransactionModal();
    } catch (error) {
      const err = error as ITransactions.Create.Error;
      toast.error(intlTerm(err.response?.data.message || errorMessage));
    }
  });

  const categories = useMemo(() => {
    return categoriesList?.filter(({ type }) => type === newTransactionType);
  }, [categoriesList, newTransactionType]);

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
    accounts: accounts ?? [],
    categories: categories ?? [],
    isLoading,
  };
}
