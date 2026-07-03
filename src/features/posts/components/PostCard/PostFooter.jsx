import { formatDistanceToNow } from "date-fns";

function PostFooter({ post }) {
  return (
    <footer className="space-y-2">
      <p className="font-semibold text-white">{post.likes.length} likes</p>

      <p className="text-xs uppercase tracking-wide text-zinc-500">
        {formatDistanceToNow(new Date(post.createdAt), {
          addSuffix: true,
        })}
      </p>
    </footer>
  );
}

export default PostFooter;
