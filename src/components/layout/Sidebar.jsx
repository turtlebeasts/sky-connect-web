import { Home, MessageCircle, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

import useAuthStore from "../../features/auth/store/auth.store";

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
  // {
  //   label: "Explore",
  //   path: "/explore",
  //   icon: Compass,
  // },
];

function Sidebar() {
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="hidden w-64 flex-col border-r border-zinc-800 p-6 lg:flex">
      <h1 className="text-3xl font-bold">Sky Connect</h1>

      <nav className="mt-10 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                  isActive
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`
              }
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}

        {user && (
          <NavLink
            to={`/profile/${user.username}`}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`
            }
          >
            <User size={22} />
            <span>Profile</span>
          </NavLink>
        )}
      </nav>
    </aside>
  );
}

export default Sidebar;
