import { FiEdit2 } from "react-icons/fi";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuthStore from "../../../auth/store/auth.store";
import useModalStore from "../../../../stores/useModalStore";
import useMessagingStore from "../../../messages/store/messaging.store";

import FollowButton from "../../../follow/components/FollowButton";
import UserMenu from "../../../../components/common/UserMenu/UserMenu";

function ProfileHeader({ profile }) {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);

  const openModal = useModalStore((state) => state.openModal);

  const { createConversation, setActiveConversation, fetchMessages } =
    useMessagingStore();

  const currentUserId = user?._id || user?.id;
  const profileUserId = profile?._id || profile?.id;

  const isOwner = currentUserId === profileUserId;

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
    <section className="relative rounded-2xl border border-zinc-800 bg-zinc-900">
      {/* Cover */}
      <div className="overflow-hidden rounded-t-2xl">
        <div className="h-36 bg-linear-to-r from-sky-600 via-cyan-500 to-blue-700" />
      </div>

      <div className="px-8 pb-8">
        <div className="-mt-16 flex flex-col items-center md:flex-row md:items-end md:justify-between">
          {/* Left */}
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

          {/* Right */}
          <div className="mt-6 flex items-center gap-3 md:mt-0">
            {isOwner ? (
              <>
                {/* Mobile */}
                <div className="relative md:hidden">
                  <UserMenu trigger="menu" profile={profile} />
                </div>

                {/* Desktop */}
                <button
                  onClick={() => openModal("edit-profile", profile)}
                  className="hidden items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 font-medium text-white transition hover:border-sky-500 hover:bg-zinc-700 md:flex"
                >
                  <FiEdit2 size={18} />
                </button>
              </>
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
