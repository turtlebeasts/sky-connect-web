import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";

import usePostsStore from "../../store/posts.store";
import useAuthStore from "../../../auth/store/auth.store";
import useModalStore from "../../../../stores/useModalStore";

function PostActions({ post }) {
  const user = useAuthStore((state) => state.user);

  const like = usePostsStore((state) => state.likePost);
  const unlike = usePostsStore((state) => state.unlikePost);

  const isLiked = post.likes.some((id) => id === user?._id || id === user?.id);
  const openModal = useModalStore((state) => state.openModal);

  const handleLike = async () => {
    if (isLiked) {
      await unlike(post._id);
    } else {
      await like(post._id);
    }
  };

  return (
    <div className="flex items-center gap-5">
      <button
        onClick={handleLike}
        className="transition hover:scale-110 active:scale-95"
      >
        {isLiked ? (
          <FaHeart size={24} className="text-red-500" />
        ) : (
          <FaRegHeart size={24} className="text-white" />
        )}
      </button>

      <button
        onClick={() => openModal("comments", post)}
        className="transition hover:scale-110 active:scale-95"
      >
        <FaRegComment size={23} className="text-white" />
      </button>

      <span className="text-sm text-zinc-400">{post.likes.length} likes</span>
    </div>
  );
}

export default PostActions;
