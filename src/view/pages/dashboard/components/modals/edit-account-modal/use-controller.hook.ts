import { z } from "zod";
import { intlService } from "../../../../../../app/services/intl.service";
import { useDashboard } from "../../../hook/use-dashboard.hook";
import { enBankAccountType } from "../../../../../../types/enums/bank-account-type.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { enKeys } from "../../../../../../types/enums/requests-keys.enum";
import { IBankAccount } from "../../../../../../types/interfaces/bank-account.interface";
import {
  useBankAccountDelete,
  useBankAccountUpdate,
} from "../../../../../../app/hooks/use-bank-account.hook";
import { useState } from "react";

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
  const bankAccountUpdate = useBankAccountUpdate();
  const bankAccountDelete = useBankAccountDelete();
  const queryClient = useQueryClient();

  const { isEditAccountModalOpen, closeEditAccountModal, accountBeingEdited } =
    useDashboard();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    control,
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: accountBeingEdited?.initialBalance,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
    },
  });

  const { currencySymbol } = intlCurrency(0);

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      await bankAccountUpdate.mutateAsync({
        ...data,
        id: accountBeingEdited!.id,
      });

      queryClient.invalidateQueries({ queryKey: enKeys.bankAccount.getAll });
      toast.success(intlTerm("Account edited successfully!"));
      closeEditAccountModal();
    } catch (error) {
      const err = error as IBankAccount.Update.Error;
      toast.error(
        intlTerm(
          err.response?.data.message || "Error while editing the account!"
        )
      );
    }
  });

  const handleDeleteAccount = async () => {
    try {
      await bankAccountDelete.mutateAsync(accountBeingEdited!.id);

      queryClient.invalidateQueries({
        queryKey: enKeys.bankAccount.getAll,
      });
      toast.success(intlTerm("Account successfully deleted!"));
      closeEditAccountModal();
    } catch (error) {
      const err = error as IBankAccount.Delete.Error;
      toast.error(
        intlTerm(err.response?.data.message || "Error deleting the account!")
      );
    }
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return {
    isEditAccountModalOpen,
    closeEditAccountModal,
    intlTerm,
    currencySymbol,
    register,
    errors,
    handleSubmit,
    control,
    isLoadingUpdate: bankAccountUpdate.isLoading,
    isLoadingDelete: bankAccountDelete.isLoading,
    isDeleteModalOpen,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    handleDeleteAccount,
  };
}
