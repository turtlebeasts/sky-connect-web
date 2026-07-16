import useMessagingStore from "../../store/messaging.store";

import ConversationItem from "../ConversationItem/ConversationItem";

function ConversationList() {
  const { conversations, isLoading } = useMessagingStore();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-400">
        Loading conversations...
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-400">
        No conversations yet.
      </div>
    );
  }

  return (
    <div className="overflow-y-auto">
      {conversations.map((conversation) => (
        <ConversationItem key={conversation._id} conversation={conversation} />
      ))}
    </div>
  );
}

export default ConversationList;
