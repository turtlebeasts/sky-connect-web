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
    // Already opened
    if (activeConversation?._id === conversation._id) {
      return;
    }

    // Leave previous room
    if (activeConversation) {
      socket.emit("leave-conversation", activeConversation._id);
    }

    // Join new room
    socket.emit("join-conversation", conversation._id);

    // Update store
    setActiveConversation(conversation);

    // Fetch messages
    await fetchMessages(conversation._id);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center gap-3 p-4 transition ${
        isActive ? "bg-zinc-800" : "hover:bg-zinc-800/60"
      }`}
    >
      <img
        src={otherUser.avatar}
        alt={otherUser.displayName}
        className="h-12 w-12 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1 text-left">
        <h3 className="truncate font-semibold text-white">
          {otherUser.displayName}
        </h3>

        <p className="truncate text-sm text-zinc-400">
          {conversation.lastMessage?.content || "Start a conversation"}
        </p>
      </div>
    </button>
  );
}

export default ConversationItem;
