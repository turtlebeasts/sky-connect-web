import { FiImage } from "react-icons/fi";

import useAuthStore from "../../../auth/store/auth.store";
import useModalStore from "../../../../stores/useModalStore";

function CreatePost() {
  const user = useAuthStore((state) => state.user);
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="flex items-center gap-4 p-5">
        <img
          src={
            user?.avatar ||
            "https://ui-avatars.com/api/?background=0f172a&color=fff"
          }
          alt={user?.username}
          className="h-11 w-11 rounded-full object-cover transition hover:ring-2 hover:ring-sky-500"
        />

        <button
          onClick={() => openModal("create-post")}
          className="flex-1 rounded-full bg-zinc-800 px-5 py-3 text-left text-zinc-400 transition duration-200 hover:bg-zinc-700"
        >
          What's on your mind?
        </button>
      </div>

      <div className="border-t border-zinc-800 p-2">
        <button
          onClick={() => openModal("create-post")}
          className="flex w-full items-center justify-center gap-2 rounded-xl py-3 font-medium text-zinc-300 transition hover:bg-zinc-800"
        >
          <FiImage size={20} className="text-sky-500" />
          Create Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
