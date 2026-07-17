import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Edit,
  LogOut,
  Menu,
  Moon,
  MoreHorizontal,
  Settings,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import useAuthStore from "../../../features/auth/store/auth.store";
import useModalStore from "../../../stores/useModalStore";

function UserMenu({ trigger = "dots", profile }) {
  const navigate = useNavigate();

  const menuRef = useRef(null);

  const [open, setOpen] = useState(false);

  const { logout } = useAuthStore();

  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) {
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
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-xl p-2 text-zinc-400 transition-all duration-200 hover:scale-110 hover:bg-zinc-800 hover:text-white active:scale-95"
      >
        {trigger === "dots" ? <MoreHorizontal size={20} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: trigger === "dots" ? 8 : -8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: trigger === "dots" ? 8 : -8,
            }}
            transition={{
              duration: 0.18,
            }}
            className={`absolute z-50 w-64 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl ${
              trigger === "dots" ? "bottom-16 left-0" : "right-0 top-12"
            }`}
          >
            <Link
              to={`/profile/${profile.username}`}
              onClick={() => setOpen(false)}
              className="group flex items-center gap-3 px-4 py-3 transition hover:bg-zinc-800"
            >
              <User
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
              My Profile
            </Link>

            <button
              onClick={() => {
                setOpen(false);
                openModal("edit-profile", profile);
              }}
              className="group flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-zinc-800"
            >
              <Edit
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
              Edit Profile
            </button>

            <button className="group flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-zinc-800">
              <Settings
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
              Settings
            </button>

            <button className="group flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-zinc-800">
              <Moon
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
              Appearance
            </button>

            <div className="border-t border-zinc-800" />

            <button
              onClick={handleLogout}
              className="group flex w-full items-center gap-3 px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
            >
              <LogOut
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default UserMenu;
