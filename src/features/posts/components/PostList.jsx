import usePostsStore from "../store/posts.store";
import PostCard from "./PostCard/PostCard";

function PostList() {
  const { posts, isLoading } = usePostsStore();

  if (isLoading) {
    return <p className="text-center text-zinc-400">Loading posts...</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center text-zinc-400">No posts yet.</p>;
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
