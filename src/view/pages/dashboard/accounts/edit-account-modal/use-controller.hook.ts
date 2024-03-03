import { useState } from "react";
import { intlService } from "../../../../../app/services/intl.service";
import { useDashboard } from "../../use-controller.hook";
import { IBankAccount } from "../../../../../types/interfaces/bank-account.interface";
import {
  useBankAccountDelete,
  useBankAccountUpdate,
} from "../../../../../app/hooks/use-bank-account.hook";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { enBankAccountType } from "../../../../../types/enums/bank-account-type.enum";

const { t } = intlService;

const schema = z.object({
  initialBalance: z.number({
    required_error: t("Initial balance is required"),
  }),
  name: z.string().nonempty(t("Account name is required")),
  color: z.string().nonempty(t("Color is required")),
  type: z.enum(
    Object.values(enBankAccountType) as [keyof typeof enBankAccountType]
  ),
});

type IFormData = z.infer<typeof schema>;

export function useController() {
  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const bankAccountUpdate = useBankAccountUpdate();
  const bankAccountDelete = useBankAccountDelete();

  const form = useForm<IFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: accountBeingEdited?.initialBalance,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    const handleSuccess = () => {
      toast.success(t("Account edited successfully!"));
      form.reset();
      closeEditAccountModal();
    };

    const handleError = (error: IBankAccount.Update.Error) => {
      const defaultMessage = "Error while editing the account!";
      toast.error(t(error.response?.data.message ?? defaultMessage));
    };

    bankAccountUpdate
      .mutateAsync({ ...data, id: accountBeingEdited!.id })
      .then(handleSuccess)
      .catch(handleError);
  });

  const handleDeleteAccount = () => {
    const handleSuccess = () => {
      toast.success(t("Account successfully deleted!"));
      closeEditAccountModal();
    };

    const handleError = (error: IBankAccount.Delete.Error) => {
      const defaultMessage = "Error deleting the account!";
      toast.error(t(error.response?.data.message ?? defaultMessage));
    };

    bankAccountDelete
      .mutateAsync(accountBeingEdited!.id)
      .then(handleSuccess)
      .catch(handleError);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return {
    t,
    isEditAccountModalOpen,
    closeEditAccountModal,
    register: form.register,
    errors: form.formState.errors,
    handleSubmit,
    control: form.control,
    isLoadingUpdate: bankAccountUpdate.isLoading,
    isLoadingDelete: bankAccountDelete.isLoading,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteAccount,
  };
}
