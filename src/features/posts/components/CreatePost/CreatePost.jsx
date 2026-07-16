import { ImagePlus, Sparkles } from "lucide-react";

import useAuthStore from "../../../auth/store/auth.store";
import useModalStore from "../../../../stores/useModalStore";

function CreatePost() {
  const user = useAuthStore((state) => state.user);

  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/70 shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center gap-4 p-5 sm:p-6">
        <img
          src={
            user?.avatar ||
            "https://ui-avatars.com/api/?background=0f172a&color=fff"
          }
          alt={user?.username}
          className="h-12 w-12 rounded-full object-cover ring-2 ring-zinc-700 transition hover:ring-sky-500"
        />

        <button
          onClick={() => openModal("create-post")}
          className="flex-1 rounded-2xl border border-zinc-700 bg-zinc-800/70 px-5 py-4 text-left transition hover:border-sky-500 hover:bg-zinc-800"
        >
          <p className="font-medium text-zinc-300">What's happening today?</p>

          <p className="mt-1 text-sm text-zinc-500">
            Share a thought, photo or update...
          </p>
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800 px-5 py-3">
        <button
          onClick={() => openModal("create-post")}
          className="flex items-center gap-2 rounded-xl px-4 py-2 text-zinc-300 transition hover:bg-zinc-800"
        >
          <ImagePlus size={20} className="text-sky-400" />

          <span className="font-medium">Photo</span>
        </button>

        <button
          onClick={() => openModal("create-post")}
          className="flex items-center gap-2 rounded-xl bg-sky-500 px-5 py-2 font-medium text-white transition hover:bg-sky-600"
        >
          <Sparkles size={18} />
          Create
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
