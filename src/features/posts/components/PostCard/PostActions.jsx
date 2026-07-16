import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa6";

import usePostsStore from "../../store/posts.store";
import useAuthStore from "../../../auth/store/auth.store";
import useModalStore from "../../../../stores/useModalStore";

function PostActions({ post }) {
  const user = useAuthStore((state) => state.user);

  const likePost = usePostsStore((state) => state.likePost);
  const unlikePost = usePostsStore((state) => state.unlikePost);

  const openModal = useModalStore((state) => state.openModal);

  const isLiked = post.likes.some((id) => id === user?._id || id === user?.id);

  const handleLike = async () => {
    if (isLiked) {
      await unlikePost(post._id);
    } else {
      await likePost(post._id);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        {/* Like */}
        <button
          onClick={handleLike}
          className="group flex items-center gap-2 transition"
        >
          {isLiked ? (
            <FaHeart
              size={24}
              className="text-red-500 transition-transform duration-200 group-hover:scale-125"
            />
          ) : (
            <FaRegHeart
              size={24}
              className="transition-transform duration-200 group-hover:scale-125"
            />
          )}

          <span className="text-sm font-medium text-zinc-300">
            {post.likes.length}
          </span>
        </button>

        {/* Comments */}
        <button
          onClick={() => openModal("comments", post)}
          className="group flex items-center gap-2 transition"
        >
          <FaRegComment
            size={23}
            className="transition-transform duration-200 group-hover:scale-125"
          />

          <span className="text-sm font-medium text-zinc-300">
            {post.commentsCount ?? post.comments?.length ?? 0}
          </span>
        </button>
      </div>
    </div>
  );
}

export default PostActions;
