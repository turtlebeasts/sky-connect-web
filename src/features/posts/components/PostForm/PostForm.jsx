import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

function PostForm({
  initialValues,
  submitText = "Post",
  isLoading = false,
  onSubmit,
}) {
  const defaultValues = useMemo(
    () => ({
      caption: initialValues?.caption || "",
    }),
    [initialValues],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(initialValues?.image || null);

  useEffect(() => {
    reset(defaultValues);

    setSelectedFile(null);
    setPreview(initialValues?.image || null);
  }, [defaultValues, initialValues, reset]);

  useEffect(() => {
    return () => {
      if (preview && selectedFile) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, selectedFile]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (preview && selectedFile) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (preview && selectedFile) {
      URL.revokeObjectURL(preview);
    }

    setSelectedFile(null);
    setPreview(null);
  };

  const handleFormSubmit = async (data) => {
    const formData = new FormData();

    formData.append("caption", data.caption);

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    const result = await onSubmit(formData);

    if (result?.success && !initialValues) {
      reset({
        caption: "",
      });

      removeImage();
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

        {errors.caption && (
          <p className="mt-1 text-sm text-red-400">{errors.caption.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="image"
          className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-800 px-4 py-8 text-zinc-400 transition hover:border-sky-500 hover:text-sky-400"
        >
          {selectedFile ? selectedFile.name : "📷 Click to upload an image"}
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {preview && (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-lg border border-zinc-700">
            <img
              src={preview}
              alt="Preview"
              className="max-h-125 w-full object-cover"
            />
          </div>

          <button
            type="button"
            onClick={removeImage}
            className="text-sm font-medium text-red-400 transition hover:text-red-300"
          >
            Remove Image
          </button>
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
