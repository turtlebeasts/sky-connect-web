function PostImage({ post }) {
  if (!post.image) return null;

  return (
    <img
      src={post.image}
      alt="Post"
      className="max-h-175 w-full object-cover"
    />
  );
}

export default PostImage;
