import { useEffect, useState } from "react";

import SearchInput from "../../../components/common/SearchInput/SearchInput";
import SearchResults from "../components/SearchResults";
import useSearchStore from "../store/useSearchStore";

function SearchPage() {
  const [query, setQuery] = useState("");

  const { searchUsers, clearResults } = useSearchStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!query.trim()) {
        clearResults();
        return;
      }

      searchUsers(query);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-white">Search</h1>

      <SearchInput
        value={query}
        onChange={setQuery}
        placeholder="Search users..."
        autoFocus
        onClear={() => setQuery("")}
      />

      <SearchResults />
    </div>
  );
}

export default SearchPage;
