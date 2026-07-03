import Modal from "../Modal/Modal";

function ConfirmationModal({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  return (
    <Modal open={open} onClose={onCancel}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white">{title}</h2>

        <p className="mt-3 text-zinc-400">{description}</p>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-zinc-700 px-4 py-2 text-white transition hover:bg-zinc-800"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;
