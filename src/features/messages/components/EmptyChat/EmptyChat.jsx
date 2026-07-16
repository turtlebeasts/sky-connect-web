function EmptyChat() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white">Your Messages</h2>

        <p className="mt-2 text-zinc-400">
          Select a conversation to start chatting.
        </p>
      </div>
    </div>
  );
}

export default EmptyChat;
