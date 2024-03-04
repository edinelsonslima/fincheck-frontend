import { enBankAccountType } from "@enums/bank-account-type.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccountCreate } from "@hooks/use-bank-account.hook";
import { IBankAccount } from "@interfaces/bank-account.interface";
import { useDashboard } from "@pages/dashboard/use-controller.hook";
import { intlService } from "@services/intl.service";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const { t } = intlService;

const schema = z.object({
  initialBalance: z.number({
    required_error: t("Initial balance is required"),
  }),
  name: z.string().nonempty(t("Account name is required")),
  color: z.string().nonempty(t("Color is required")),
  type: z.enum([
    enBankAccountType.CASH,
    enBankAccountType.CHECKING,
    enBankAccountType.INVESTMENT,
  ]),
});

type IFormData = z.infer<typeof schema>;

export function useController() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();

  const bankAccountCreate = useBankAccountCreate();
  const form = useForm<IFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: 0,
      type: enBankAccountType.CHECKING,
      color: "",
      name: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const handleSuccess = () => {
      toast.success(t("Account registered successfully!"));
      form.reset();
      closeNewAccountModal();
    };

    const handleError = (error: IBankAccount.Create.Error) => {
      const defaultMessage = "Error while registering the account!";
      toast.error(t(error.response?.data.message ?? defaultMessage));
    };

    bankAccountCreate.mutateAsync(data).then(handleSuccess).catch(handleError);
  });

  return {
    t,
    handleSubmit,
    closeNewAccountModal,
    control: form.control,
    isNewAccountModalOpen,
    register: form.register,
    errors: form.formState.errors,
    isLoading: bankAccountCreate.isLoading,
  };
}
