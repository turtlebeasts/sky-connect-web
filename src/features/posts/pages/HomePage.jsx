import { useEffect } from "react";
import { Home } from "lucide-react";

import usePostsStore from "../store/posts.store";
import CreatePost from "../components/CreatePost/CreatePost";
import PostList from "../components/PostList";

function HomePage() {
  const { fetchPosts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 border-b border-zinc-800 bg-zinc-950/80 px-4 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Home size={22} className="text-sky-400" />

          <h1 className="text-xl font-bold tracking-tight">Home</h1>
        </div>
      </header>

      {/* Feed */}
      <div className="flex flex-col gap-6 px-4 py-6 sm:px-6">
        <CreatePost />

        <PostList />
      </div>
    </div>
  );
}

export default HomePage;
