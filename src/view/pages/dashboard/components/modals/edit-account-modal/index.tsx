import { Controller } from "react-hook-form";
import { enBankAccountType } from "../../../../../../types/enums/bank-account-type.enum";
import { Button } from "../../../../../components/button.component";
import { ColorsDropdownInput } from "../../../../../components/colors-dropdown.components";
import { InputCurrency } from "../../../../../components/input-currency.component";
import { Input } from "../../../../../components/input.component";
import { Modal } from "../../../../../components/modal.component";
import { Select } from "../../../../../components/select.component";
import { useController } from "./use-controller.hook";
import { IconTrash } from "../../../../../../assets/icons/trash.icon";
import { ConfirmDeleteModal } from "../../../../../components/confirm-delete-modal.component";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    currencySymbol,
    intlTerm,
    errors,
    handleSubmit,
    register,
    control,
    isLoadingUpdate,
    handleCloseDeleteModal,
    handleOpenDeleteModal,
    isDeleteModalOpen,
    handleDeleteAccount,
    isLoadingDelete,
  } = useController();

  if (isDeleteModalOpen) {
    return (
      <ConfirmDeleteModal
        onConfirm={handleDeleteAccount}
        onClose={handleCloseDeleteModal}
        loading={isLoadingDelete}
        title={intlTerm("Are you sure you want to delete this account?")}
        description={intlTerm(
          "When deleting the account, all records of related income and expenses will also be deleted."
        )}
      />
    );
  }

  return (
    <Modal
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      title={intlTerm("Edit account")}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <IconTrash className="w-6 h-6 stroke-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-tighter text-xs">
            {intlTerm("Initial balance")}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-tighter text-lg">
              {currencySymbol}
            </span>
            <Controller
              control={control}
              name="initialBalance"
              render={({ field: { onChange, value } }) => (
                <InputCurrency
                  value={value}
                  onChange={onChange}
                  error={errors.initialBalance?.message}
                />
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={intlTerm("Account name")}
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={intlTerm("Type")}
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    label: intlTerm("Checking"),
                    value: enBankAccountType.CHECKING,
                  },
                  {
                    label: intlTerm("Investment"),
                    value: enBankAccountType.INVESTMENT,
                  },
                  {
                    label: intlTerm("Cash"),
                    value: enBankAccountType.CASH,
                  },
                ]}
              />
            )}
          />

          <Controller
            name="color"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ColorsDropdownInput
                error={errors.color?.message}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </div>

        <Button type="submit" className="w-full mt-6" loading={isLoadingUpdate}>
          {intlTerm("Save")}
        </Button>
      </form>
    </Modal>
  );
}
