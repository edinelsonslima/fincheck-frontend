import { Controller } from "react-hook-form";
import { Button } from "../../../../../components/button.component";
import { DatePickerInput } from "../../../../../components/date-picker-input.component";
import { InputCurrency } from "../../../../../components/input-currency.component";
import { Input } from "../../../../../components/input.component";
import { Modal } from "../../../../../components/modal.component";
import { Select } from "../../../../../components/select.component";
import { useController } from "./use-controller.hook";

export function NewTransactionModal() {
  const {
    closeNewTransactionModal,
    currencySymbol,
    intlTerm,
    isExpense,
    isNewTransactionModalOpen,
    control,
    errors,
    handleSubmit,
    register,
    accounts,
    categories,
    isLoading,
  } = useController();

  return (
    <Modal
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
      title={intlTerm(isExpense ? "New expense" : "New income")}
    >
      <form onSubmit={handleSubmit}>
        <div>
          <span className="text-gray-600 tracking-tighter text-xs">
            {intlTerm(isExpense ? "Expense value" : "Income value")}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-tighter text-lg">
              {currencySymbol}
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
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            error={errors.name?.message}
            placeholder={intlTerm(isExpense ? "Expense name" : "Income name")}
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
                placeholder={intlTerm("Category")}
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
                placeholder={intlTerm(isExpense ? "Pay with" : "Receive with")}
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
          {intlTerm("Create")}
        </Button>
      </form>
    </Modal>
  );
}
