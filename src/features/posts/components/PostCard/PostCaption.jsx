function PostCaption({ post }) {
  if (!post.caption) return null;

  return (
    <p className="leading-relaxed text-zinc-300">
      <span className="mr-2 font-semibold text-white">
        {post.author.username}
      </span>

      {post.caption}
    </p>
  );
}

export default PostCaption;
