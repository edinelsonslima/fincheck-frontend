import { IconTrash } from "@icons/trash.icon";
import { intlService } from "@services/intl.service";
import { Modal } from "./modal.component";
import { Button } from "./button.component";

interface IConfirmDeleteModalProps {
  onConfirm(): void;
  onClose(): void;
  title: string;
  description?: string;
  loading?: boolean;
}

const { t } = intlService;

export function ConfirmDeleteModal({
  onClose,
  onConfirm,
  title,
  description,
  loading,
}: IConfirmDeleteModalProps) {
  return (
    <Modal
      open
      title={t("Delete")}
      onClose={onClose}
      className="flex flex-col items-center text-center gap-6 text-gray-800"
    >
      <div className="w-[3.25rem] h-[3.25rem] rounded-full bg-red-50 flex items-center justify-center">
        <IconTrash className="w-6 h-6 stroke-red-900" />
      </div>
      <p className="max-w-[11.25rem] font-bold tracking-tighter">{title}</p>

      {description && <p className="tracking-tighter">{description}</p>}

      <div className="mt-10 space-y-4">
        <Button
          variant="danger"
          className="w-full"
          onClick={onConfirm}
          loading={loading}
        >
          {t("Yes, I want to delete.")}
        </Button>

        <Button
          variant="ghost"
          className="w-full"
          onClick={onClose}
          disabled={loading}
        >
          {t("Cancel")}
        </Button>
      </div>
    </Modal>
  );
}
