import UserLink from "../../../components/common/UserLink/UserLink";

function UserCard({ user }) {
  return (
    <UserLink
      user={user}
      className="block transition-colors duration-200 hover:bg-neutral-900"
    >
      <div className="flex items-center gap-4 px-4 py-3">
        <img
          src={user.avatar}
          alt={user.displayName}
          className="h-12 w-12 rounded-full object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-white">
            {user.displayName || user.username}
          </h3>

          <p className="truncate text-sm text-neutral-400">@{user.username}</p>

          {user.bio && (
            <p className="mt-1 truncate text-sm text-neutral-500">{user.bio}</p>
          )}
        </div>
      </div>
    </UserLink>
  );
}

export default UserCard;
