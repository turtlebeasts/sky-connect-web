import { useEffect } from "react";

import socket from "./socket";
import useAuthStore from "../features/auth/store/auth.store";
import useMessagingStore from "../features/messages/store/messaging.store";

function SocketProvider({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = useAuthStore((state) => state.token);

  const addIncomingMessage = useMessagingStore(
    (state) => state.addIncomingMessage,
  );

  const setTypingUser = useMessagingStore((state) => state.setTypingUser);

  const clearTypingUser = useMessagingStore((state) => state.clearTypingUser);

  const markMessagesReadLocally = useMessagingStore(
    (state) => state.markMessagesReadLocally,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      socket.disconnect();
      return;
    }

    socket.auth = {
      token,
    };

    socket.connect();

    socket.off("receive-message");
    socket.off("user-typing");
    socket.off("user-stop-typing");
    socket.off("messages-read");

    // ===========================
    // New Message
    // ===========================
    socket.on("receive-message", (message) => {
      addIncomingMessage(message);
    });

    // ===========================
    // Typing
    // ===========================
    socket.on("user-typing", ({ conversationId, userId }) => {
      setTypingUser({
        conversationId,
        userId,
      });
    });

    socket.on("user-stop-typing", ({ conversationId }) => {
      clearTypingUser(conversationId);
    });

    // ===========================
    // Read Receipts
    // ===========================
    socket.on("messages-read", ({ conversationId, readerId, readAt }) => {
      markMessagesReadLocally({
        conversationId,
        readerId,
        readAt,
      });
    });

    return () => {
      socket.off("receive-message");
      socket.off("user-typing");
      socket.off("user-stop-typing");
      socket.off("messages-read");

      socket.disconnect();
    };
  }, [
    isAuthenticated,
    token,
    addIncomingMessage,
    setTypingUser,
    clearTypingUser,
    markMessagesReadLocally,
  ]);

  return children;
}

export default SocketProvider;
