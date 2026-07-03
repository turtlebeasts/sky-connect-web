import useAuthStore from "../../../auth/store/auth.store";

import UserLink from "../../../../components/common/UserLink/UserLink";
import PostMenu from "./PostMenu";

function PostHeader({ post }) {
  const user = useAuthStore((state) => state.user);

  const isOwner = user?.id === post.author._id || user?.id === post.author.id;

  return (
    <header className="flex items-center justify-between p-4">
      <UserLink user={post.author} className="flex items-center gap-3">
        <img
          src={post.author.avatar}
          alt={post.author.username}
          className="h-11 w-11 rounded-full object-cover ring-2 ring-zinc-700 transition hover:ring-sky-500"
        />

        <div>
          <h3 className="font-semibold text-white transition hover:text-sky-400">
            {post.author.displayName}
          </h3>

          <p className="text-sm text-zinc-400 transition hover:text-zinc-300">
            @{post.author.username}
          </p>
        </div>
      </UserLink>

      {isOwner && <PostMenu post={post} />}
    </header>
  );
}

export default PostHeader;
