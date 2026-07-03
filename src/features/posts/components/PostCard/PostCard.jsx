import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostActions from "./PostActions";
import PostCaption from "./PostCaption";
import PostFooter from "./PostFooter";

function PostCard({ post }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <PostHeader post={post} />

      <PostImage post={post} />

      <div className="space-y-4 p-4">
        <PostActions post={post} />
        <PostCaption post={post} />
        <PostFooter post={post} />
      </div>
    </article>
  );
}

export default PostCard;
