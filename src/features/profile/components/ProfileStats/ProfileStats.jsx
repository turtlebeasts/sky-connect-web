function StatCard({ label, value, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center transition hover:border-sky-500 disabled:cursor-default disabled:hover:border-zinc-800"
      disabled={!onClick}
    >
      <p className="text-3xl font-bold text-white">{value}</p>

      <p className="mt-2 text-sm text-zinc-400">{label}</p>
    </button>
  );
}

function ProfileStats({
  posts = 0,
  followers = 0,
  following = 0,
  onFollowersClick,
  onFollowingClick,
}) {
  return (
    <section className="mt-6 grid grid-cols-3 gap-4">
      <StatCard label="Posts" value={posts} />

      <StatCard
        label="Followers"
        value={followers}
        onClick={onFollowersClick}
      />

      <StatCard
        label="Following"
        value={following}
        onClick={onFollowingClick}
      />
    </section>
  );
}

export default ProfileStats;
