import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import useCommentsStore from "../../store/comments.store";

function CommentForm({ postId }) {
  const { createComment, isLoading } = useCommentsStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = async (data) => {
    const result = await createComment(postId, data);

    if (result.success) {
      toast.success("Comment added.");
      reset();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border-t border-zinc-800 p-4"
    >
      <div className="flex items-end gap-3">
        <textarea
          rows={2}
          placeholder="Write a comment..."
          className="flex-1 resize-none rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-sky-500"
          {...register("text", {
            required: "Comment cannot be empty.",
            maxLength: {
              value: 1000,
              message: "Comment cannot exceed 1000 characters.",
            },
          })}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-xl bg-sky-500 px-5 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>

      {errors.text && (
        <p className="mt-2 text-sm text-red-400">{errors.text.message}</p>
      )}
    </form>
  );
}

export default CommentForm;
