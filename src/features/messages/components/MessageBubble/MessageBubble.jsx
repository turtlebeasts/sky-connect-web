import useAuthStore from "../../../auth/store/auth.store";

function MessageBubble({ message }) {
  const currentUser = useAuthStore((state) => state.user);

  const isMine = message.sender._id === currentUser.id;

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[70%]">
        <div
          className={`rounded-2xl px-4 py-2 ${
            isMine ? "bg-sky-500 text-white" : "bg-zinc-800 text-white"
          }`}
        >
          {message.image && (
            <img src={message.image} alt="" className="mb-2 rounded-lg" />
          )}

          {message.content && <p>{message.content}</p>}
        </div>

        {isMine && (
          <p className="mt-1 px-2 text-right text-xs text-zinc-500">
            {message.readAt ? "✓✓ Seen" : "✓ Sent"}
          </p>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
