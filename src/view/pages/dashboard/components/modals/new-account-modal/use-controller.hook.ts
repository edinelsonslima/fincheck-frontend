import { z } from "zod";
import { intlService } from "../../../../../../app/services/intl.service";
import { useDashboard } from "../../../hook/use-dashboard.hook";
import { enBankAccountType } from "../../../../../../types/enums/bank-account-type.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccountCreate } from "../../../../../../app/hooks/use-bank-account.hook";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { enKeys } from "../../../../../../types/enums/requests-keys.enum";
import { IBankAccount } from "../../../../../../types/interfaces/bank-account.interface";

const { intlCurrency, intlTerm } = intlService;

const schema = z.object({
  initialBalance: z.number({
    required_error: intlTerm("Initial balance is required"),
  }),
  name: z.string().nonempty(intlTerm("Account name is required")),
  color: z.string().nonempty(intlTerm("Color is required")),
  type: z.enum(
    Object.values(enBankAccountType) as [keyof typeof enBankAccountType]
  ),
});

type IFormData = z.infer<typeof schema>;

export function useController() {
  const { mutateAsync, isLoading } = useBankAccountCreate();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    control,
    reset,
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: 0,
      type: enBankAccountType.CHECKING,
      color: "",
      name: "",
    },
  });

  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const { currencySymbol } = intlCurrency(0);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await mutateAsync(data);

      queryClient.invalidateQueries({ queryKey: enKeys.bankAccount.getAll });
      toast.success(intlTerm("Account registered successfully!"));
      closeNewAccountModal();
      reset();
    } catch (error) {
      const err = error as IBankAccount.Create.Error;
      toast.error(
        intlTerm(
          err.response?.data.message || "Error while registering the account!"
        )
      );
    }
  });

  return {
    isNewAccountModalOpen,
    closeNewAccountModal,
    intlTerm,
    currencySymbol,
    register,
    errors,
    handleSubmit,
    control,
    isLoading,
  };
}
