import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";

function Dropdown({ open, onClose, children, className = "" }) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, scale: 0.96, y: -8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.15 }}
          className={`absolute right-0 top-12 z-50 w-52 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Dropdown;
