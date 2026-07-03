import { useEffect } from "react";

import usePostsStore from "../store/posts.store";
import CreatePost from "../components/CreatePost/CreatePost";
import PostList from "../components/PostList";

function HomePage() {
  const { fetchPosts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="mx-auto max-w-2xl py-8">
      <CreatePost />
      <PostList />
    </div>
  );
}

export default HomePage;
