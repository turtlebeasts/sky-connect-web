import { useEffect } from "react";

import useCommentsStore from "../../store/comments.store";
import CommentItem from "../CommentItem/CommentItem";

function CommentList({ postId }) {
  const { commentsByPost, fetchComments, isLoading } = useCommentsStore();

  const comments = commentsByPost[postId] || [];

  useEffect(() => {
    fetchComments(postId);
  }, [postId]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8 text-zinc-400">
        Loading comments...
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="py-10 text-center text-zinc-500">
        No comments yet.
        <br />
        Be the first one to comment.
      </div>
    );
  }

  return (
    <div className="divide-y divide-zinc-800">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
