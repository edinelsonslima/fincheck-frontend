import { z } from "zod";
import { intlService } from "../../../../../../app/services/intl.service";
import { enBankAccountType } from "../../../../../../types/enums/bank-account-type.enum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { enKeys } from "../../../../../../types/enums/requests-keys.enum";
import { IBankAccount } from "../../../../../../types/interfaces/bank-account.interface";
import {
  useBankAccountDelete,
  useBankAccountUpdate,
} from "../../../../../../app/hooks/use-bank-account.hook";
import { useState } from "react";
import { ITransactions } from "../../../../../../types/interfaces/transactions.interface";
import { useParameters } from "../../../../../../app/hooks/use-parameters.hook";
import { useCache } from "../../../../../../app/hooks/use-cache.hook";
import { enTransactionType } from "../../../../../../types/enums/transaction-type.enum";
import { useDashboard } from "../../../use-controller.hook";

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
  const [parameters] = useParameters();

  const [, setCacheBankAccounts] = useCache<IBankAccount.GetAll.Response>(
    enKeys.bankAccount.getAll
  );

  const [getCacheTransactions, setCacheTransactions] =
    useCache<ITransactions.GetAll.Response>(
      enKeys.transactions.getAll({
        month: parameters.month,
        year: parameters.year,
        type: parameters.type,
        bankAccountId: parameters.bankAccountId,
      })
    );

  const bankAccountUpdate = useBankAccountUpdate();
  const bankAccountDelete = useBankAccountDelete();

  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
    control,
    reset,
  } = useForm<IFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      initialBalance: accountBeingEdited?.initialBalance,
      type: accountBeingEdited?.type,
      color: accountBeingEdited?.color,
      name: accountBeingEdited?.name,
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const editedBankAccount = await bankAccountUpdate.mutateAsync({
        ...data,
        id: accountBeingEdited!.id,
      });

      reset();
      updateCacheBankAccountsEdited(editedBankAccount);
      toast.success(t("Account edited successfully!"));
      closeEditAccountModal();
    } catch (error) {
      const err = error as IBankAccount.Update.Error;
      toast.error(
        t(err.response?.data.message || "Error while editing the account!")
      );
    }
  });

  const handleDeleteAccount = async () => {
    try {
      await bankAccountDelete.mutateAsync(accountBeingEdited!.id);

      updateCacheBankAccountsDeleted();
      toast.success(t("Account successfully deleted!"));
      closeEditAccountModal();
    } catch (error) {
      const err = error as IBankAccount.Delete.Error;
      toast.error(
        t(err.response?.data.message || "Error deleting the account!")
      );
    }
  };

  const updateCacheBankAccountsEdited = (
    bankAccount: IBankAccount.Update.Response
  ) => {
    setCacheBankAccounts((bankAccounts) => {
      if (!bankAccounts) {
        return bankAccounts;
      }

      const bankAccountIndex = bankAccounts.findIndex(({ id }) => {
        return id === accountBeingEdited?.id;
      });

      if (bankAccountIndex === -1) {
        return bankAccounts;
      }

      const currentBalance = getCacheTransactions()
        ?.filter(({ bankAccountId }) => bankAccountId === bankAccount.id)
        .reduce((total, { value, type }) => {
          if (type === enTransactionType.INCOME) {
            total += value;
          }

          if (type === enTransactionType.EXPENSE) {
            total -= value;
          }

          return total;
        }, bankAccount.initialBalance);

      bankAccounts[bankAccountIndex] = {
        ...bankAccounts[bankAccountIndex],
        ...bankAccount,
        currentBalance: currentBalance ?? bankAccount.initialBalance,
      };

      return bankAccounts;
    });
  };

  const updateCacheBankAccountsDeleted = () => {
    setCacheTransactions((transactions) =>
      transactions?.filter(
        ({ bankAccountId }) => bankAccountId !== accountBeingEdited?.id
      )
    );

    setCacheBankAccounts((bankAccounts) =>
      bankAccounts?.filter(({ id }) => id !== accountBeingEdited?.id)
    );
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
    t,
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
