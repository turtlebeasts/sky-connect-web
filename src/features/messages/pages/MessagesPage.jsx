import { useEffect } from "react";

import socket from "../../../socket/socket";
import useMessagingStore from "../store/messaging.store";

import ConversationList from "../components/ConversationList/ConversationList";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import EmptyChat from "../components/EmptyChat/EmptyChat";

function MessagesPage() {
  const { activeConversation, fetchConversations } = useMessagingStore();

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  return (
    <div className="flex h-screen">
      <aside className="w-80 border-r border-zinc-800">
        <ConversationList />
      </aside>

      <section className="flex flex-1">
        {activeConversation ? <ChatWindow /> : <EmptyChat />}
      </section>
    </div>
  );
}

export default MessagesPage;
