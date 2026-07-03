import EmptySearch from "./EmptySearch";
import UserCard from "./UserCard";

import UserSkeleton from "../../../components/skeletons/UserSkeleton";

import useSearchStore from "../store/useSearchStore";

function SearchResults() {
  const { users, isLoading, hasSearched } = useSearchStore();

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
        {Array.from({ length: 6 }).map((_, index) => (
          <UserSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!users.length) {
    return <EmptySearch hasSearched={hasSearched} />;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950">
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </div>
  );
}

export default SearchResults;
