import useModalStore from "../../../../stores/useModalStore";
import usePostsStore from "../../store/posts.store";

import ConfirmationModal from "../../../../components/ui/ConfirmationModal/ConfirmationModal";
function DeletePostModal() {
  const { modal, closeModal } = useModalStore();
  const deletePost = usePostsStore((state) => state.deletePost);

  const handleDelete = async () => {
    await deletePost(modal.data._id);
    closeModal();
  };

  return (
    <ConfirmationModal
      open={modal?.type === "delete-post"}
      title="Delete Post?"
      description="This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
      onConfirm={handleDelete}
      onCancel={closeModal}
    />
  );
}

export default DeletePostModal;
