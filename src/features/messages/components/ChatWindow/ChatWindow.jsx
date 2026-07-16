import { useEffect, useRef } from "react";

import useMessagingStore from "../../store/messaging.store";
import useAuthStore from "../../../auth/store/auth.store";

import MessageBubble from "../MessageBubble/MessageBubble";
import MessageInput from "../MessageInput/MessageInput";

function ChatWindow() {
  const currentUser = useAuthStore((state) => state.user);

  const { activeConversation, messages, typingUsers, markMessagesAsRead } =
    useMessagingStore();

  const messagesContainerRef = useRef(null);
  const bottomRef = useRef(null);

  const conversationMessages = messages[activeConversation._id] || [];

  const otherUser = activeConversation.participants.find(
    (participant) => participant._id !== currentUser.id,
  );

  const isTyping = typingUsers[activeConversation._id] === otherUser._id;

  // ===========================
  // Mark old unread messages as read
  // ONLY when opening a conversation
  // ===========================
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

  // ===========================
  // Auto scroll
  // ===========================
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [conversationMessages, isTyping]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-zinc-800 p-4">
        <img
          src={otherUser.avatar}
          alt={otherUser.displayName}
          className="h-10 w-10 rounded-full"
        />

        <div>
          <h2 className="font-semibold text-white">{otherUser.displayName}</h2>

          <p className="text-sm text-zinc-400">@{otherUser.username}</p>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className="flex-1 space-y-4 overflow-y-auto p-6"
      >
        {conversationMessages.map((message) => (
          <MessageBubble key={message._id} message={message} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span>{otherUser.displayName} is typing</span>

            <div className="flex gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:0ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />
              <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatWindow;
