function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  autoFocus = false,
  className = "",
}) {
  return (
    <div className={`relative ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-neutral-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full rounded-xl border border-neutral-700 bg-neutral-900 py-3 pr-4 pl-11 text-white placeholder:text-neutral-500 transition-colors duration-200 focus:border-sky-500 focus:outline-none"
      />
    </div>
  );
}

export default SearchInput;
