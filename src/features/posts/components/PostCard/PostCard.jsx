import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostCaption from "./PostCaption";
import PostFooter from "./PostFooter";

function PostCard({ post }) {
  return (
    <article
      className="
        overflow-hidden
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900/70
        backdrop-blur-xl
        shadow-lg
        shadow-black/20
        transition-all
        duration-300
        hover:border-zinc-700
        hover:shadow-xl
        hover:shadow-black/30
      "
    >
      <PostHeader post={post} />

      <PostImage post={post} />

      <div className="space-y-5 p-5">
        <PostActions post={post} />

        <PostCaption post={post} />

        <PostFooter post={post} />
      </div>
    </article>
  );
}

export default PostCard;
