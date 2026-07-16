import { create } from "zustand";

import {
  getConversations,
  getMessages,
  createConversation,
  sendMessage,
  markMessagesAsRead,
} from "../api/messaging.api";

import useAuthStore from "../../auth/store/auth.store";

const useMessagingStore = create((set, get) => ({
  conversations: [],
  activeConversation: null,

  // Messages grouped by conversationId
  messages: {},
  typingUsers: {},

  isLoading: false,
  error: null,

  fetchConversations: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const data = await getConversations();

      set({
        conversations: data.conversations,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error.response?.data?.message || "Failed to fetch conversations.",
        isLoading: false,
      });
    }
  },

  createConversation: async (participantId) => {
    try {
      const data = await createConversation(participantId);

      const exists = get().conversations.some(
        (conversation) => conversation._id === data.conversation._id,
      );

      if (!exists) {
        set((state) => ({
          conversations: [data.conversation, ...state.conversations],
        }));
      }

      set({
        activeConversation: data.conversation,
      });

      return {
        success: true,
        conversation: data.conversation,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create conversation.";

      set({
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  fetchMessages: async (conversationId) => {
    try {
      const data = await getMessages(conversationId);

      set((state) => ({
        messages: {
          ...state.messages,
          [conversationId]: data.messages,
        },
      }));
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch messages.",
      });
    }
  },

  sendMessage: async (messageData) => {
    try {
      const data = await sendMessage(messageData);

      const conversationId = data.message.conversation;

      return {
        success: true,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to send message.";

      set({
        error: message,
      });

      return {
        success: false,
        message,
      };
    }
  },

  setActiveConversation: (conversation) => {
    set({
      activeConversation: conversation,
    });
  },

  clearMessages: () => {
    set({
      messages: {},
    });
  },

  clearError: () => {
    set({
      error: null,
    });
  },
  addIncomingMessage: (message) => {
    const conversationId =
      typeof message.conversation === "object"
        ? message.conversation._id
        : message.conversation;

    set((state) => {
      const existing = state.messages[conversationId] || [];

      if (existing.some((m) => m._id === message._id)) {
        return state;
      }

      return {
        messages: {
          ...state.messages,
          [conversationId]: [...existing, message],
        },

        conversations: state.conversations.map((conversation) =>
          conversation._id === conversationId
            ? {
                ...conversation,
                lastMessage: message,
                lastMessageAt: message.createdAt,
              }
            : conversation,
        ),
      };
    });
  },
  setTypingUser: ({ conversationId, userId }) => {
    set((state) => ({
      typingUsers: {
        ...state.typingUsers,
        [conversationId]: userId,
      },
    }));
  },

  clearTypingUser: (conversationId) => {
    set((state) => {
      const typingUsers = { ...state.typingUsers };

      delete typingUsers[conversationId];

      return { typingUsers };
    });
  },

  markMessagesAsRead: async (conversationId) => {
    try {
      await markMessagesAsRead(conversationId);
    } catch (error) {
      console.error(error);
    }
  },

  markMessagesReadLocally: ({ conversationId, readerId, readAt }) => {
    const currentUserId = useAuthStore.getState().user.id;

    set((state) => ({
      messages: {
        ...state.messages,
        [conversationId]: (state.messages[conversationId] || []).map(
          (message) => ({
            ...message,
            readAt:
              message.sender._id === currentUserId ? readAt : message.readAt,
          }),
        ),
      },
    }));
  },
}));

export default useMessagingStore;
