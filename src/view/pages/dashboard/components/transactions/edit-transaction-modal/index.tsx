import { Controller } from "react-hook-form";
import { Button } from "../../../../../components/button.component";
import { DatePickerInput } from "../../../../../components/date-picker-input.component";
import { InputCurrency } from "../../../../../components/input-currency.component";
import { Input } from "../../../../../components/input.component";
import { Modal } from "../../../../../components/modal.component";
import { Select } from "../../../../../components/select.component";
import { useController } from "./use-controller.hook";
import { ITransactions } from "../../../../../../types/interfaces/transactions.interface";
import { ConfirmDeleteModal } from "../../../../../components/confirm-delete-modal.component";
import { IconTrash } from "../../../../../../assets/icons/trash.icon";

interface IEditTransactionModal {
  transaction: ITransactions.Entity;
  open: boolean;
  onClose: () => void;
}

export function EditTransactionModal({
  transaction,
  open,
  onClose,
}: IEditTransactionModal) {
  const {
    t,
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading,
    isExpense,
    isDeleteModalOpen,
    handleDeleteTransaction,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    isLoadingDelete,
  } = useController(transaction, onClose);

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        onConfirm={handleDeleteTransaction}
        onClose={handleCloseDeleteModal}
        loading={isLoadingDelete}
        title={t(
          `Are you sure you want to delete this ${
            isExpense ? "expense" : "income"
          }?`
        )}
      />
    );
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={t(isExpense ? "Edit expense" : "Edit income")}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <IconTrash className="w-6 h-6 stroke-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-tighter text-xs">
            {t(isExpense ? "Expense value" : "Income value")}
          </span>

          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, value } }) => (
              <InputCurrency
                value={value}
                onChange={onChange}
                error={errors.value?.message}
              />
            )}
          />
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            error={errors.name?.message}
            placeholder={t(isExpense ? "Expense name" : "Income name")}
            {...register("name")}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                onChange={onChange}
                error={errors.categoryId?.message}
                placeholder={t("Category")}
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="bankAccountId"
            render={({ field: { onChange, value } }) => (
              <Select
                value={value}
                onChange={onChange}
                error={errors.bankAccountId?.message}
                placeholder={t(isExpense ? "Pay with" : "Receive with")}
                options={accounts.map((account) => ({
                  value: account.id,
                  label: account.name,
                }))}
              />
            )}
          />

          <Controller
            control={control}
            name="date"
            render={({ field: { value, onChange } }) => (
              <DatePickerInput
                value={value}
                onChange={onChange}
                error={errors.date?.message}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" loading={isLoading}>
          {t("Save")}
        </Button>
      </form>
    </Modal>
  );
}
