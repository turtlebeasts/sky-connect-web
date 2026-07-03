import toast from "react-hot-toast";

import Modal from "../../../../components/ui/Modal/Modal";
import useModalStore from "../../../../stores/useModalStore";
import usePostsStore from "../../store/posts.store";

import PostForm from "../PostForm/PostForm";

function CreatePostModal() {
  const { modal, closeModal } = useModalStore();

  const { createPost, isLoading } = usePostsStore();

  if (!modal || modal.type !== "create-post") {
    return null;
  }

  const handleCreate = async (data) => {
    const result = await createPost(data);

    if (result.success) {
      toast.success("Post created.");
      closeModal();
    } else {
      toast.error(result.message);
    }

    return result;
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">Create Post</h2>

        <PostForm
          submitText="Post"
          isLoading={isLoading}
          onSubmit={handleCreate}
        />
      </div>
    </Modal>
  );
}

export default CreatePostModal;
