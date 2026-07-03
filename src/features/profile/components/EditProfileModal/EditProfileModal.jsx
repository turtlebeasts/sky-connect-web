import toast from "react-hot-toast";

import Modal from "../../../../components/ui/Modal/Modal";
import useModalStore from "../../../../stores/useModalStore";
import useProfileStore from "../../store/profile.store";

import { useForm } from "react-hook-form";

function EditProfileModal() {
  const { modal, closeModal } = useModalStore();

  const { updateProfile, isLoading } = useProfileStore();

  if (!modal || modal.type !== "edit-profile") {
    return null;
  }

  const profile = modal.data;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: profile.displayName,
      bio: profile.bio,
      avatar: profile.avatar,
    },
  });

  const onSubmit = async (data) => {
    const result = await updateProfile(data);

    if (result.success) {
      toast.success("Profile updated successfully.");
      closeModal();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <div className="p-6">
        <h2 className="mb-6 text-2xl font-bold text-white">Edit Profile</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Display Name
            </label>

            <input
              type="text"
              {...register("displayName")}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Avatar URL
            </label>

            <input
              type="url"
              {...register("avatar")}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Bio
            </label>

            <textarea
              rows={4}
              maxLength={200}
              {...register("bio")}
              className="w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 p-4 text-white outline-none transition focus:border-sky-500"
            />

            {errors.bio && (
              <p className="mt-1 text-sm text-red-400">{errors.bio.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-zinc-700 px-5 py-2 text-white transition hover:bg-zinc-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-sky-500 px-5 py-2 font-semibold text-white transition hover:bg-sky-600 disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
