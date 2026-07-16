import { Search } from "lucide-react";

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

  return (
    <div className="flex h-full flex-col bg-zinc-950">
      {/* Search */}
      <div className="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950 p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
          />

          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-sky-500"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 text-5xl">💬</div>

            <h2 className="text-lg font-semibold text-white">
              No conversations yet
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              Start chatting with your friends.
            </p>
          </div>
        ) : (
          <div className="p-2">
            {conversations.map((conversation) => (
              <ConversationItem
                key={conversation._id}
                conversation={conversation}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ConversationList;
