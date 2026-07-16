import { Flame, Bell, Users, Sparkles } from "lucide-react";

function RightSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-80 xl:block">
      <div className="flex h-full flex-col gap-6 p-6">
        {/* Welcome Card */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-xl">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-sky-500/20 p-3">
              <Sparkles className="text-sky-400" size={22} />
            </div>

            <h2 className="text-lg font-semibold">Welcome to Sky Connect</h2>
          </div>

          <p className="text-sm leading-6 text-zinc-400">
            Connect with friends, share your thoughts, and discover new
            communities.
          </p>
        </div>

        {/* Upcoming Features */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-xl">
          <h3 className="mb-5 text-lg font-semibold">Coming Soon</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-2xl bg-zinc-800/50 p-4">
              <Bell className="text-yellow-400" size={22} />

              <div>
                <h4 className="font-medium">Notifications</h4>

                <p className="text-sm text-zinc-400">
                  Likes, comments & follows
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-zinc-800/50 p-4">
              <Users className="text-sky-400" size={22} />

              <div>
                <h4 className="font-medium">Friend Suggestions</h4>

                <p className="text-sm text-zinc-400">
                  Find people you may know
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-zinc-800/50 p-4">
              <Flame className="text-orange-400" size={22} />

              <div>
                <h4 className="font-medium">Trending Topics</h4>

                <p className="text-sm text-zinc-400">Discover what's popular</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto text-center text-xs leading-6 text-zinc-500">
          <p>Sky Connect © 2026</p>

          <p className="mt-2">
            Built with ❤️ using React, Node.js, Express & Socket.IO
          </p>
        </div>
      </div>
    </aside>
  );
}

export default RightSidebar;
