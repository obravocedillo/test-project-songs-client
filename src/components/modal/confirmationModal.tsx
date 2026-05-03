import { PrimaryModal } from "./primaryModal";

interface IConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: IConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <PrimaryModal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col items-center justify-center gap-8 py-4">
        <p className="text-base text-gray-600 text-center">{message}</p>
        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </PrimaryModal>
  );
};

export default ConfirmationModal;
