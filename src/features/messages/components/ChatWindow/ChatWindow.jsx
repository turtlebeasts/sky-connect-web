import { useEffect, useRef } from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";

import useMessagingStore from "../../store/messaging.store";
import useAuthStore from "../../../auth/store/auth.store";

import MessageBubble from "../MessageBubble/MessageBubble";
import MessageInput from "../MessageInput/MessageInput";

function ChatWindow() {
  const currentUser = useAuthStore((state) => state.user);

  const {
    activeConversation,
    messages,
    typingUsers,
    markMessagesAsRead,
    setActiveConversation,
  } = useMessagingStore();

  const bottomRef = useRef(null);

  const conversationMessages = messages[activeConversation._id] || [];

  const otherUser = activeConversation.participants.find(
    (participant) => participant._id !== currentUser.id,
  );

  const isTyping = typingUsers[activeConversation._id] === otherUser._id;

  useEffect(() => {
    if (!activeConversation) return;

    if (conversationMessages.length === 0) return;

    const unreadExists = conversationMessages.some(
      (message) => message.sender._id !== currentUser.id && !message.readAt,
    );

    if (!unreadExists) return;

    markMessagesAsRead(activeConversation._id);
  }, [
    activeConversation?._id,
    conversationMessages,
    currentUser.id,
    markMessagesAsRead,
  ]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversationMessages, isTyping]);

  return (
    <div className="flex h-full flex-1 flex-col bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-zinc-800 bg-zinc-950/80 px-5 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          {/* Mobile Back */}
          <button
            onClick={() => setActiveConversation(null)}
            className="rounded-lg p-2 transition hover:bg-zinc-800 md:hidden"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="relative">
            <img
              src={otherUser.avatar}
              alt={otherUser.displayName}
              className="h-12 w-12 rounded-full object-cover"
            />

            {/* Ready for online status */}
            {/* <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-950 bg-green-500" /> */}
          </div>

          <div>
            <h2 className="font-semibold text-white">
              {otherUser.displayName}
            </h2>

            <p className="text-sm text-zinc-400">@{otherUser.username}</p>
          </div>
        </div>

        <button className="rounded-lg p-2 transition hover:bg-zinc-800">
          <MoreVertical size={20} />
        </button>
      </header>

      {/* Messages */}
      <div
        className="
          flex-1
          overflow-y-auto
          bg-linear-to-b
          from-zinc-950
          to-zinc-900
          px-5
          py-6
        "
      >
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          {conversationMessages.map((message) => (
            <MessageBubble key={message._id} message={message} />
          ))}

          {isTyping && (
            <div className="flex items-center gap-3">
              <img
                src={otherUser.avatar}
                alt=""
                className="h-8 w-8 rounded-full"
              />

              <div className="flex gap-1 rounded-full bg-zinc-800 px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
}

export default ChatWindow;
