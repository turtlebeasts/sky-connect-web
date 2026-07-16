import api from "../../../api/axios";

export const getConversations = async () => {
  const response = await api.get("/conversations");
  return response.data;
};

export const getConversationById = async (id) => {
  const response = await api.get(`/conversations/${id}`);
  return response.data;
};

export const createConversation = async (participantId) => {
  const response = await api.post("/conversations", {
    participantId,
  });

  return response.data;
};

export const getMessages = async (conversationId) => {
  const response = await api.get(`/messages/${conversationId}`);
  return response.data;
};

export const sendMessage = async (messageData) => {
  const response = await api.post("/messages", messageData);
  return response.data;
};

export const markMessagesAsRead = async (conversationId) => {
  const response = await api.patch(`/messages/${conversationId}/read`);

  return response.data;
};
