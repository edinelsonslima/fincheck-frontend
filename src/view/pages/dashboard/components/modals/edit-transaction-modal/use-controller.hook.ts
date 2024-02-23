import { z } from "zod";
import { intlService } from "../../../../../../app/services/intl.service";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccountGetAll } from "../../../../../../app/hooks/use-bank-account.hook";
import { useCategoriesGetAll } from "../../../../../../app/hooks/use-categories.hook";
import { useMemo } from "react";
import { useTransactionsUpdate } from "../../../../../../app/hooks/use-transactions.hook";
import { enTransactionType } from "../../../../../../types/enums/transaction-type.enum";
import { ITransactions } from "../../../../../../types/interfaces/transactions.interface";

const { intlTerm } = intlService;

const schema = z.object({
  value: z.number({ required_error: intlTerm("Provide the value.") }),
  name: z.string().nonempty(intlTerm("Provide the name.")),
  categoryId: z.string().nonempty(intlTerm("Provide the category.")),
  bankAccountId: z.string().nonempty(intlTerm("Provide the bank account ID.")),
  date: z.date(),
});

type FormData = z.infer<typeof schema>;

export function useController(transaction: ITransactions.Entity) {
  const bankAccountGetAll = useBankAccountGetAll();
  const transactionsUpdate = useTransactionsUpdate();
  const categoriesGetAll = useCategoriesGetAll();

  const isExpense = transaction.type === enTransactionType.EXPENSE;

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
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

  const handleSubmit = hookFormSubmit(async (data) => {
    console.log(data);
  });

  const categories = useMemo(() => {
    const data = categoriesGetAll.data;
    return data?.filter(({ type }) => type === transaction.type);
  }, [categoriesGetAll.data, transaction.type]);

  return {
    register,
    errors,
    control,
    intlTerm,
    handleSubmit,
    isExpense,
    accounts: bankAccountGetAll.data ?? [],
    categories: categories ?? [],
    isLoading: transactionsUpdate.isLoading,
  };
}
