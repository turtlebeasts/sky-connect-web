function DropdownItem({ children, icon, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition

      ${
        danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-zinc-200 hover:bg-zinc-800"
      }`}
    >
      {icon}

      <span>{children}</span>
    </button>
  );
}

export default DropdownItem;
