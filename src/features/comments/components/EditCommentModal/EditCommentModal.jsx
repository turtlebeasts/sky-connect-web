import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Modal from "../../../../components/ui/Modal/Modal";
import useModalStore from "../../../../stores/useModalStore";
import useCommentsStore from "../../store/comments.store";

function EditCommentModal() {
  const { modal, closeModal } = useModalStore();
  const { updateComment, isLoading } = useCommentsStore();

  if (!modal || modal.type !== "edit-comment") {
    return null;
  }

  const { comment, postId } = modal.data;

  const { register, handleSubmit } = useForm({
    defaultValues: {
      text: comment.text,
    },
  });

  const onSubmit = async (data) => {
    const result = await updateComment(postId, comment._id, data);

    if (result.success) {
      toast.success("Comment updated.");
      closeModal();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <div className="p-6">
        <h2 className="mb-6 text-xl font-bold text-white">Edit Comment</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <textarea
            rows={4}
            {...register("text", {
              required: true,
            })}
            className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 p-4 text-white outline-none focus:border-sky-500"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-zinc-700 px-5 py-2 text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-sky-500 px-5 py-2 font-semibold text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditCommentModal;
