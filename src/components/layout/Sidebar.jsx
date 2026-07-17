import { Home, MessageCircle, Search, User, Cloud } from "lucide-react";
import { NavLink } from "react-router-dom";

import useAuthStore from "../../features/auth/store/auth.store";
import UserMenu from "../common/UserMenu/UserMenu";

const navItems = [
  {
    label: "Home",
    path: "/",
    icon: Home,
  },
  {
    label: "Search",
    path: "/search",
    icon: Search,
  },
  {
    label: "Messages",
    path: "/messages",
    icon: MessageCircle,
  },
];

function Sidebar() {
  const user = useAuthStore((state) => state.user);

  return (
    <aside
      className="
        sticky top-0 hidden h-screen w-72 flex-col
        border-r border-zinc-800
        bg-zinc-950/80
        backdrop-blur-xl
        lg:flex
      "
    >
      {/* Logo */}
      <div className="border-b border-zinc-800 p-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-sky-500 p-3 shadow-lg shadow-sky-500/20">
            <Cloud className="text-white" size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight">Sky Connect</h1>

            <p className="text-sm text-zinc-400">Connect with the world</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-5">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200 ${
                  isActive
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <Icon
                size={22}
                className="transition-transform duration-200 group-hover:scale-110"
              />

              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}

        {user && (
          <NavLink
            to={`/profile/${user.username}`}
            className={({ isActive }) =>
              `group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-200 ${
                isActive
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`
            }
          >
            <User
              size={22}
              className="transition-transform duration-200 group-hover:scale-110"
            />

            <span className="font-medium">Profile</span>
          </NavLink>
        )}
      </nav>

      {/* User Card */}
      {user && (
        <div className="border-t border-zinc-800 p-5">
          <div className="flex items-center gap-3 rounded-2xl bg-zinc-900 p-3">
            <NavLink
              to={`/profile/${user.username}`}
              className="flex min-w-0 flex-1 items-center gap-3"
            >
              <img
                src={user.avatar}
                alt={user.displayName}
                className="h-12 w-12 rounded-full object-cover ring-2 ring-zinc-700"
              />

              <div className="min-w-0">
                <h3 className="truncate font-semibold text-white">
                  {user.displayName}
                </h3>

                <p className="truncate text-sm text-zinc-400">
                  @{user.username}
                </p>
              </div>
            </NavLink>

            <UserMenu trigger="dots" profile={user} />
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
