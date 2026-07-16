import { useEffect, useRef, useState } from "react";

import socket from "../../../../socket/socket";
import useAuthStore from "../../../auth/store/auth.store";
import useMessagingStore from "../../store/messaging.store";

function MessageInput() {
  const [content, setContent] = useState("");

  const typingTimeout = useRef(null);
  const isTyping = useRef(false);

  const currentUser = useAuthStore((state) => state.user);

  const { activeConversation, sendMessage } = useMessagingStore();

  useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;

    setContent(value);

    if (!activeConversation) return;

    // First key press
    if (!isTyping.current) {
      isTyping.current = true;

      socket.emit("typing", {
        conversationId: activeConversation._id,
      });
    }

    // Reset timer
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      isTyping.current = false;

      socket.emit("stop-typing", {
        conversationId: activeConversation._id,
        userId: currentUser.id,
      });
    }, 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    // Stop typing immediately after sending
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    if (isTyping.current) {
      socket.emit("stop-typing", {
        conversationId: activeConversation._id,
        userId: currentUser.id,
      });

      isTyping.current = false;
    }

    const result = await sendMessage({
      conversationId: activeConversation._id,
      content,
    });

    if (result.success) {
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 border-t border-zinc-800 p-4"
    >
      <input
        value={content}
        onChange={handleChange}
        placeholder="Type a message..."
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-3 text-white outline-none"
      />

      <button
        type="submit"
        className="rounded-lg bg-sky-500 px-5 text-white transition hover:bg-sky-600"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
