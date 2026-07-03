import toast from "react-hot-toast";

import ConfirmationModal from "../../../../components/ui/ConfirmationModal/ConfirmationModal";

import useModalStore from "../../../../stores/useModalStore";
import useCommentsStore from "../../store/comments.store";

function DeleteCommentModal() {
  const { modal, closeModal } = useModalStore();

  const { deleteComment } = useCommentsStore();

  if (!modal || modal.type !== "delete-comment") {
    return null;
  }

  const { comment, postId } = modal.data;

  const handleDelete = async () => {
    const result = await deleteComment(postId, comment._id);

    if (result.success) {
      toast.success("Comment deleted.");
      closeModal();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <ConfirmationModal
      open={true}
      title="Delete Comment"
      description="Are you sure you want to delete this comment?"
      confirmText="Delete"
      onConfirm={handleDelete}
      onCancel={closeModal}
    />
  );
}

export default DeleteCommentModal;
