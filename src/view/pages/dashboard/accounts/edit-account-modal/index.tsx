import { Controller } from "react-hook-form";
import { enBankAccountType } from "../../../../../types/enums/bank-account-type.enum";
import { Button } from "../../../../components/button.component";
import { ColorsDropdownInput } from "../../../../components/colors-dropdown.components";
import { InputCurrency } from "../../../../components/input-currency.component";
import { Input } from "../../../../components/input.component";
import { Modal } from "../../../../components/modal.component";
import { Select } from "../../../../components/select.component";
import { useController } from "./use-controller.hook";
import { IconTrash } from "../../../../../assets/icons/trash.icon";
import { ConfirmDeleteModal } from "../../../../components/confirm-delete-modal.component";

export function EditAccountModal() {
  const {
    isEditAccountModalOpen,
    closeEditAccountModal,
    t,
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
        title={t("Are you sure you want to delete this account?")}
        description={t(
          "When deleting the account, all records of related income and expenses will also be deleted."
        )}
      />
    );
  }

  return (
    <Modal
      open={isEditAccountModalOpen}
      onClose={closeEditAccountModal}
      title={t("Edit account")}
      rightAction={
        <button onClick={handleOpenDeleteModal}>
          <IconTrash className="w-6 h-6 stroke-red-900" />
        </button>
      }
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-tighter text-xs">
            {t("Initial balance")}
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

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            placeholder={t("Account name")}
            error={errors.name?.message}
            {...register("name")}
          />

          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                placeholder={t("Type")}
                error={errors.type?.message}
                onChange={onChange}
                value={value}
                options={[
                  {
                    label: t("Checking"),
                    value: enBankAccountType.CHECKING,
                  },
                  {
                    label: t("Investment"),
                    value: enBankAccountType.INVESTMENT,
                  },
                  {
                    label: t("Cash"),
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
          {t("Save")}
        </Button>
      </form>
    </Modal>
  );
}
