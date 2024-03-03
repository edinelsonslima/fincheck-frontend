import { z } from "zod";
import { intlService } from "../../../../../app/services/intl.service";
import { enBankAccountType } from "../../../../../types/enums/bank-account-type.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useBankAccountCreate } from "../../../../../app/hooks/use-bank-account.hook";
import toast from "react-hot-toast";
import { IBankAccount } from "../../../../../types/interfaces/bank-account.interface";
import { useDashboard } from "../../use-controller.hook";

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
    bankAccountCreate
      .mutateAsync(data)
      .then(() => {
        toast.success(t("Account registered successfully!"));
        form.reset();
        closeNewAccountModal();
      })
      .catch((error) => {
        const err = error as IBankAccount.Create.Error;
        const defaultMessage = "Error while registering the account!";
        toast.error(t(err.response?.data.message ?? defaultMessage));
      });
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
