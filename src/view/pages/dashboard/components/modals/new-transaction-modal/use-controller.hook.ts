import { z } from "zod";
import { intlService } from "../../../../../../app/services/intl.service";
import { useDashboard } from "../../../hook/use-dashboard.hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const isExpense = newTransactionType === "EXPENSE";

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      categoryId: "",
      date: new Date(),
      bankAccountId: "",
    },
  });

  const handleSubmit = hookFormSubmit((data) => {
    console.log({ data });
  });

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
  };
}
