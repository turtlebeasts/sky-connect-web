import { useEffect, useRef, useState } from "react";
import { LogOut, MoreHorizontal, Moon, Settings, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import useAuthStore from "../../features/auth/store/auth.store";

function SidebarUserMenu() {
  const navigate = useNavigate();

  const { user, logout } = useAuthStore();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <div ref={menuRef} className="relative">
      <motion.div
        whileHover={{
          scale: 1.015,
        }}
        transition={{
          duration: 0.15,
        }}
        className="flex items-center gap-3 rounded-2xl bg-zinc-900 p-3 transition-colors hover:bg-zinc-800"
      >
        <Link
          to={`/profile/${user.username}`}
          className="group flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:bg-zinc-800"
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

            <p className="truncate text-sm text-zinc-400">@{user.username}</p>
          </div>
        </Link>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-xl p-2 text-zinc-400 transition-all duration-200 hover:scale-110 hover:bg-zinc-700 hover:text-white active:scale-95"
        >
          <MoreHorizontal size={20} />
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 10,
            }}
            transition={{
              duration: 0.18,
              ease: "easeOut",
            }}
            className="absolute bottom-20 left-0 z-50 w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl"
          >
            <Link
              to={`/profile/${user.username}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 transition hover:bg-zinc-800"
            >
              <User size={18} />
              My Profile
            </Link>

            <button className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-zinc-800">
              <Settings size={18} />
              Settings
            </button>

            <button className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-zinc-800">
              <Moon size={18} />
              Appearance
            </button>

            <div className="border-t border-zinc-800" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut size={18} />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SidebarUserMenu;
