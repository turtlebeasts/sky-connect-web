import Modal from "../../../../components/ui/Modal/Modal";
import useModalStore from "../../../../stores/useModalStore";

import CommentList from "../CommentList/CommentList";
import CommentForm from "../CommentForm/CommentForm";

function CommentsModal() {
  const { modal, closeModal } = useModalStore();

  if (!modal || modal.type !== "comments") {
    return null;
  }

  const post = modal.data;

  return (
    <Modal open={true} onClose={closeModal}>
      <div className="flex h-[80vh] w-150 max-w-full flex-col bg-zinc-900">
        <header className="border-b border-zinc-800 p-5">
          <h2 className="text-xl font-bold text-white">Comments</h2>
        </header>

        <div className="flex-1 overflow-y-auto">
          <CommentList postId={post._id} />
        </div>

        <CommentForm postId={post._id} />
      </div>
    </Modal>
  );
}

export default CommentsModal;
