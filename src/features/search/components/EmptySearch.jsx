function EmptySearch({ hasSearched }) {
  if (hasSearched) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-lg font-semibold text-white">No users found</h2>

        <p className="mt-2 text-neutral-500">
          Try searching with a different username or display name.
        </p>
      </div>
    );
  }

  return (
    <div className="py-16 text-center">
      <h2 className="text-lg font-semibold text-white">Search for people</h2>

      <p className="mt-2 text-neutral-500">
        Find users by their username or display name.
      </p>
    </div>
  );
}

export default EmptySearch;
