import { Home, MessageCircle, Search, User } from "lucide-react";
import { NavLink } from "react-router-dom";

import useAuthStore from "../../features/auth/store/auth.store";

function MobileBottomNav() {
  const user = useAuthStore((state) => state.user);

  const navItems = [
    {
      path: "/",
      icon: Home,
      label: "Home",
    },
    {
      path: "/search",
      icon: Search,
      label: "Search",
    },
    {
      path: "/messages",
      icon: MessageCircle,
      label: "Messages",
    },
    {
      path: `/profile/${user?.username}`,
      icon: User,
      label: "Profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-xl lg:hidden">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 transition ${
                  isActive ? "text-sky-400" : "text-zinc-500 hover:text-white"
                }`
              }
            >
              <Icon size={22} />

              <span className="text-[11px] font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default MobileBottomNav;
