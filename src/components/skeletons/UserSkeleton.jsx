function UserSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 animate-pulse">
      <div className="h-12 w-12 rounded-full bg-neutral-800" />

      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-40 rounded bg-neutral-800" />
        <div className="h-3 w-28 rounded bg-neutral-800" />
        <div className="h-3 w-52 rounded bg-neutral-800" />
      </div>
    </div>
  );
}

export default UserSkeleton;
