import { FiEdit2 } from "react-icons/fi";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuthStore from "../../../auth/store/auth.store";
import useModalStore from "../../../../stores/useModalStore";
import useMessagingStore from "../../../messages/store/messaging.store";

import FollowButton from "../../../follow/components/FollowButton";

function ProfileHeader({ profile }) {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const openModal = useModalStore((state) => state.openModal);

  const { createConversation, setActiveConversation, fetchMessages } =
    useMessagingStore();

  const isOwner = user?.id === profile?._id;

  const handleMessage = async () => {
    const result = await createConversation(profile._id);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setActiveConversation(result.conversation);

    await fetchMessages(result.conversation._id);

    navigate("/messages");
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="h-36 bg-linear-to-r from-sky-600 via-cyan-500 to-blue-700" />

      <div className="px-8 pb-8">
        <div className="-mt-16 flex flex-col items-center md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col items-center md:flex-row md:items-end md:gap-6">
            <img
              src={profile.avatar}
              alt={profile.username}
              className="h-32 w-32 rounded-full border-4 border-zinc-900 object-cover shadow-xl"
            />

            <div className="mt-5 text-center md:mt-0 md:text-left">
              <h1 className="text-3xl font-bold text-white">
                {profile.displayName}
              </h1>

              <p className="mt-1 text-zinc-400">@{profile.username}</p>

              {profile.bio && (
                <p className="mt-4 max-w-xl leading-relaxed text-zinc-300">
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          <div className="mt-6 flex gap-3 md:mt-0">
            {isOwner ? (
              <button
                onClick={() => openModal("edit-profile", profile)}
                className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 font-medium text-white transition hover:border-sky-500 hover:bg-zinc-700"
              >
                <FiEdit2 size={18} />
                Edit Profile
              </button>
            ) : (
              <>
                <FollowButton username={profile.username} />

                <button
                  onClick={handleMessage}
                  className="flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 font-medium text-white transition hover:border-sky-500 hover:bg-zinc-700"
                >
                  <MessageCircle size={18} />
                  Message
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
