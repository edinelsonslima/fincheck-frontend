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

  const bankAccounts = useBankAccountGet();
  const transactionsCreate = useTransactionsCreate();
  const categories = useCategoriesGet();

  const isExpense = newTransactionType === enTransactionType.EXPENSE;

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      categoryId: "",
      date: new Date(),
      bankAccountId: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const successMessage = isExpense
      ? "Expense successfully registered!"
      : "Income successfully registered!";

    const errorMessage = isExpense
      ? "Error registering expense!"
      : "Error registering income!";

    const createData = {
      ...data,
      type: newTransactionType!,
      date: data.date.toISOString(),
    };

    transactionsCreate
      .mutateAsync(createData)
      .then(() => {
        toast.success(t(successMessage));
        form.reset();
        closeNewTransactionModal();
      })
      .catch((error) => {
        const err = error as ITransactions.Create.Error;
        toast.error(t(err.response?.data.message || errorMessage));
      });
  });

  const categoriesFiltered = useMemo(() => {
    return categories.data?.filter(({ type }) => type === newTransactionType);
  }, [categories.data, newTransactionType]);

  return {
    t,
    isExpense,
    handleSubmit,
    register: form.register,
    errors: form.formState.errors,
    control: form.control,
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    accounts: bankAccounts.data ?? [],
    categories: categoriesFiltered ?? [],
    isLoading: transactionsCreate.isLoading,
  };
}
