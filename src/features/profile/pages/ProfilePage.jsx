import { useEffect } from "react";
import { useParams } from "react-router-dom";

import useProfileStore from "../store/profile.store";
import usePostsStore from "../../posts/store/posts.store";
import useFollowStore from "../../follow/store/useFollowStore";

import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import ProfileStats from "../components/ProfileStats/ProfileStats";
import PostCard from "../../posts/components/PostCard/PostCard";

function ProfilePage() {
  const { username } = useParams();

  const { profile, followersCount, followingCount, fetchProfile, isLoading } =
    useProfileStore();

  const { fetchFollowStatus } = useFollowStore();

  const { posts, fetchUserPosts } = usePostsStore();

  useEffect(() => {
    fetchProfile(username);
    fetchUserPosts(username);
    fetchFollowStatus(username);
  }, [username]);

  if (isLoading || !profile) {
    return (
      <div className="flex justify-center py-20 text-zinc-400">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <ProfileHeader profile={profile} />

      <ProfileStats
        posts={posts.length}
        followers={followersCount}
        following={followingCount}
      />

      <section className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        ) : (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
            No posts yet.
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
