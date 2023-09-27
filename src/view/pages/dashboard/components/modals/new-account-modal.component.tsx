import { intlService } from "../../../../../app/services/intl.service";
import { InputCurrency } from "../../../../components/input-currency.component";
import { Modal } from "../../../../components/modal.component";
import { useDashboard } from "../../hook/use-dashboard.hook";

export function NewAccountModal() {
  const { isNewAccountModalOpen, closeNewAccountModal } = useDashboard();
  return (
    <Modal
      open={isNewAccountModalOpen}
      onClose={closeNewAccountModal}
      title={intlService.intlTerm("New account")}
    >
      <InputCurrency />
    </Modal>
  );
}
