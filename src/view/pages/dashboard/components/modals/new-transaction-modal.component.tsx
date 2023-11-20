import { intlService } from "../../../../../app/services/intl.service";
import { InputCurrency } from "../../../../components/input-currency.component";
import { Input } from "../../../../components/input.component";
import { Modal } from "../../../../components/modal.component";
import { Select } from "../../../../components/select.component";
import { useDashboard } from "../../hook/use-dashboard.hook";

export function NewTransactionModal() {
  const {
    isNewTransactionModalOpen,
    closeNewTransactionModal,
    newTransactionType,
  } = useDashboard();
  const { intlCurrency, intlTerm } = intlService;
  const { currencySymbol } = intlCurrency(0);
  const isExpense = newTransactionType === "EXPENSE";

  return (
    <Modal
      open={isNewTransactionModalOpen}
      onClose={closeNewTransactionModal}
      title={intlTerm(isExpense ? "New expense" : "New income")}
    >
      <form>
        <div>
          <span className="text-gray-600 tracking-tighter text-xs">
            {intlTerm(isExpense ? "Expense value" : "Income value")}
          </span>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 tracking-tighter text-lg">
              {currencySymbol}
            </span>
            <InputCurrency />
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Input
            type="text"
            name={intlTerm(isExpense ? "Expense name" : "Income name")}
            placeholder={intlTerm(isExpense ? "Expense name" : "Income name")}
          />

          <Select
            placeholder={intlTerm("Category")}
            options={[
              {
                label: intlTerm("Checking"),
                value: "CHECKING",
              },
              {
                label: intlTerm("Investment"),
                value: "INVESTMENT",
              },
              {
                label: intlTerm("Cash"),
                value: "CASH",
              },
            ]}
          />

          <Select
            placeholder={intlTerm(isExpense ? "Pay with" : "Receive with")}
            options={[
              {
                label: intlTerm("Checking"),
                value: "CHECKING",
              },
              {
                label: intlTerm("Investment"),
                value: "INVESTMENT",
              },
              {
                label: intlTerm("Cash"),
                value: "CASH",
              },
            ]}
          />
        </div>
      </form>
    </Modal>
  );
}
