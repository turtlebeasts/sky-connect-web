import UserLink from "../../../../components/common/UserLink/UserLink";
import useAuthStore from "../../../auth/store/auth.store";
import CommentMenu from "../CommentMenu/CommentMenu";

function CommentItem({ comment }) {
  const user = useAuthStore((state) => state.user);

  const isOwner =
    user?.id === comment.author._id || user?.id === comment.author.id;

  return (
    <div className="flex gap-3 border-b border-zinc-800 p-4 last:border-none">
      <UserLink user={comment.author}>
        <img
          src={comment.author.avatar}
          alt={comment.author.username}
          className="h-10 w-10 rounded-full object-cover transition hover:ring-2 hover:ring-sky-500"
        />
      </UserLink>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <UserLink user={comment.author} className="min-w-0">
            <h4 className="font-semibold text-white transition hover:text-sky-400">
              {comment.author.displayName}
            </h4>

            <p className="text-sm text-zinc-400">@{comment.author.username}</p>
          </UserLink>

          {isOwner && <CommentMenu comment={comment} postId={comment.post} />}
        </div>

        <p className="mt-2 wrap-break-word leading-relaxed text-zinc-200">
          {comment.text}
        </p>
      </div>
    </div>
  );
}

export default CommentItem;
