import socket from "../../../../socket/socket";
import useAuthStore from "../../../auth/store/auth.store";
import useMessagingStore from "../../store/messaging.store";

function ConversationItem({ conversation }) {
  const currentUser = useAuthStore((state) => state.user);

  const activeConversation = useMessagingStore(
    (state) => state.activeConversation,
  );

  const setActiveConversation = useMessagingStore(
    (state) => state.setActiveConversation,
  );

  const fetchMessages = useMessagingStore((state) => state.fetchMessages);

  const otherUser = conversation.participants.find(
    (participant) => participant._id !== currentUser.id,
  );

  const isActive = activeConversation?._id === conversation._id;

  const handleClick = async () => {
    if (activeConversation?._id === conversation._id) return;

    if (activeConversation) {
      socket.emit("leave-conversation", activeConversation._id);
    }

    socket.emit("join-conversation", conversation._id);

    setActiveConversation(conversation);

    await fetchMessages(conversation._id);
  };

  const lastMessage =
    conversation.lastMessage?.content || "Start a conversation";

  const lastTime = conversation.lastMessageAt
    ? new Date(conversation.lastMessageAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <button
      onClick={handleClick}
      className={`group w-full rounded-2xl p-3 transition-all duration-200 ${
        isActive ? "bg-sky-500/15 ring-1 ring-sky-500/30" : "hover:bg-zinc-900"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="relative shrink-0">
          <img
            src={otherUser.avatar}
            alt={otherUser.displayName}
            className="h-14 w-14 rounded-full object-cover ring-2 ring-zinc-700 transition group-hover:ring-sky-500"
          />

          {/* Online indicator (future) */}
          {/* <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-zinc-950 bg-green-500" /> */}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-center justify-between gap-2">
            <h3 className="truncate font-semibold text-white">
              {otherUser.displayName}
            </h3>

            <span className="text-xs text-zinc-500">{lastTime}</span>
          </div>

          <p className="mt-1 truncate text-sm text-zinc-400">{lastMessage}</p>
        </div>

        {/* Future unread badge */}
        {false && (
          <div className="flex h-6 min-w-6 items-center justify-center rounded-full bg-sky-500 px-2 text-xs font-semibold text-white">
            2
          </div>
        )}
      </div>
    </button>
  );
}

export default ConversationItem;
