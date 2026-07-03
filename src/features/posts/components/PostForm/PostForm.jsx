import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

function PostForm({
  initialValues,
  submitText = "Post",
  isLoading = false,
  onSubmit,
}) {
  const defaultValues = useMemo(
    () =>
      initialValues ?? {
        caption: "",
        image: "",
      },
    [initialValues],
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [imageError, setImageError] = useState(false);

  const image = watch("image");

  useEffect(() => {
    reset(defaultValues);
    setImageError(false);
  }, [reset, defaultValues]);

  const handleFormSubmit = async (data) => {
    const result = await onSubmit(data);

    if (result?.success && !initialValues) {
      reset({
        caption: "",
        image: "",
      });

      setImageError(false);
    }

    return result;
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <div>
        <textarea
          rows={4}
          placeholder="What's on your mind?"
          className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 p-4 text-white placeholder:text-zinc-500 outline-none transition focus:border-sky-500"
          {...register("caption")}
        />
      </div>

      <div>
        <input
          type="url"
          placeholder="Paste image URL (optional)"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder:text-zinc-500 outline-none transition focus:border-sky-500"
          {...register("image")}
        />

        {errors.image && (
          <p className="mt-1 text-sm text-red-400">{errors.image.message}</p>
        )}
      </div>

      {image && !imageError && (
        <div className="overflow-hidden rounded-lg border border-zinc-800">
          <img
            src={image}
            alt="Preview"
            className="max-h-125 w-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-sky-500 py-3 font-semibold text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Please wait..." : submitText}
      </button>
    </form>
  );
}

export default PostForm;
