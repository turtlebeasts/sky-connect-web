import useProfileStore from "../../profile/store/profile.store";
import useFollowStore from "../store/useFollowStore";

function FollowButton({ username, onChange }) {
  const { followStatus, isLoading, follow, unfollow } = useFollowStore();

  const isFollowing = followStatus[username] ?? false;
  const { incrementFollowers, decrementFollowers } = useProfileStore();
  const handleClick = async () => {
    if (isFollowing) {
      const result = await unfollow(username);

      if (result.success) {
        onChange?.(true);
      }

      decrementFollowers();
    } else {
      const result = await follow(username);

      if (result.success) {
        onChange?.(true);
      }

      incrementFollowers();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors ${
        isFollowing
          ? "bg-zinc-800 text-white hover:bg-zinc-700"
          : "bg-sky-500 text-white hover:bg-sky-600"
      }`}
    >
      {isLoading ? "Loading..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
}

export default FollowButton;
