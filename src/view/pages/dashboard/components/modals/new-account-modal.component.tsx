import { intlService } from "../../../../../app/services/intl.service";
import { ColorsDropdownInput } from "../../../../components/colors-dropdown.components";
import { InputCurrency } from "../../../../components/input-currency.component";
import { Input } from "../../../../components/input.component";
import { Modal } from "../../../../components/modal.component";
import { Select } from "../../../../components/select.component";
import { useDashboard } from "../../hook/use-dashboard.hook";

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();
  const { intlCurrency, intlTerm } = intlService;
  const { currencySymbol } = intlCurrency(0);

  return (
    <Modal
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
      title={intlTerm("New account")}
    >
      <form>
        <div>
          <span className="text-gray-600 tracking-tighter text-xs">
            {intlTerm("Balance")}
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
            name={intlTerm("Name")}
            placeholder={intlTerm("Account name")}
          />

          <Select
            placeholder={intlTerm("Type")}
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

          <ColorsDropdownInput />
        </div>
      </form>
    </Modal>
  );
}
