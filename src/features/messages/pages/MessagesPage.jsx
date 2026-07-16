import { useEffect } from "react";
import { MessageCircle } from "lucide-react";

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
    <div className="flex h-[calc(100vh-1px)] flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <MessageCircle className="text-sky-400" size={22} />

          <h1 className="text-xl font-bold">Messages</h1>
        </div>
      </header>

      {/* Content */}
      <div className="flex min-h-0 flex-1">
        {/* Conversation List */}
        <aside
          className={`
            border-r border-zinc-800 bg-zinc-950
            ${
              activeConversation
                ? "hidden md:block md:w-80"
                : "block w-full md:w-80"
            }
          `}
        >
          <ConversationList />
        </aside>

        {/* Chat */}
        <section
          className={`
            flex-1 bg-zinc-950
            ${activeConversation ? "flex" : "hidden md:flex"}
          `}
        >
          {activeConversation ? <ChatWindow /> : <EmptyChat />}
        </section>
      </div>
    </div>
  );
}

export default MessagesPage;
