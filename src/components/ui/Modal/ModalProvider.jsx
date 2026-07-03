import useModalStore from "../../../stores/useModalStore";

import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import CreatePostModal from "../../../features/posts/components/CreatePostModal/CreatePostModal";
import EditPostModal from "../../../features/posts/components/EditPostModal/EditPostModal";
import EditProfileModal from "../../../features/profile/components/EditProfileModal/EditProfileModal";
import CommentsModal from "../../../features/comments/components/CommentsModal/CommentsModal";
import EditCommentModal from "../../../features/comments/components/EditCommentModal/EditCommentModal";
import DeleteCommentModal from "../../../features/comments/components/DeleteCommentModal/DeleteCommentModal";

function ModalProvider() {
  const { modal } = useModalStore();

  if (!modal) return null;

  switch (modal.type) {
    case "create-post":
      return <CreatePostModal />;

    case "edit-post":
      return <EditPostModal />;

    case "delete-post":
      return <ConfirmationModal />;

    case "edit-profile":
      return <EditProfileModal />;

    case "comments":
      return <CommentsModal />;

    case "comments":
      return <CommentsModal />;

    case "edit-comment":
      return <EditCommentModal />;

    case "delete-comment":
      return <DeleteCommentModal />;
    default:
      return null;
  }
}

export default ModalProvider;
