import toast from "react-hot-toast";

import Modal from "../../../../components/ui/Modal/Modal";
import useModalStore from "../../../../stores/useModalStore";
import usePostsStore from "../../store/posts.store";
import PostForm from "../PostForm/PostForm";

function EditPostModal() {
  const { modal, closeModal } = useModalStore();
  const { updatePost, isLoading } = usePostsStore();

  if (!modal || modal.type !== "edit-post") {
    return null;
  }

  const post = modal.data;

  const handleUpdate = async (data) => {
    const result = await updatePost(post._id, data);

    if (result.success) {
      toast.success("Post updated successfully.");
      closeModal();
    } else {
      toast.error(result.message);
    }

    return result;
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">Edit Post</h2>

        <PostForm
          initialValues={{
            caption: post.caption,
            image: post.image,
          }}
          submitText="Save Changes"
          isLoading={isLoading}
          onSubmit={handleUpdate}
        />
      </div>
    </Modal>
  );
}

export default EditPostModal;
