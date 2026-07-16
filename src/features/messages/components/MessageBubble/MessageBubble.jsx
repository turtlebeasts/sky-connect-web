import useAuthStore from "../../../auth/store/auth.store";

function MessageBubble({ message }) {
  const currentUser = useAuthStore((state) => state.user);

  const isMine = message.sender._id === currentUser.id;

  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[85%] sm:max-w-[75%] lg:max-w-[65%]">
        <div
          className={`rounded-3xl px-4 py-3 shadow-md ${
            isMine
              ? "rounded-br-lg bg-sky-500 text-white"
              : "rounded-bl-lg bg-zinc-800 text-white"
          }`}
        >
          {message.image && (
            <img
              src={message.image}
              alt=""
              className="mb-3 max-h-80 w-full rounded-2xl object-cover"
            />
          )}

          {message.content && (
            <p className="wrap-break-word whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
          )}

          <div
            className={`mt-2 flex items-center gap-2 text-[11px] ${
              isMine
                ? "justify-end text-sky-100/80"
                : "justify-end text-zinc-400"
            }`}
          >
            <span>{time}</span>

            {isMine && <span>{message.readAt ? "✓✓ Seen" : "✓ Sent"}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
