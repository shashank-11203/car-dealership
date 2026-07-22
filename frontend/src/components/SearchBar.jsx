import { Search } from "lucide-react";

function SearchBar({
  search,
  setSearch,
  placeholder = "Search vehicles...",
}) {
  return (
    <div className="relative w-full">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="
          w-full
          pl-12
          pr-4
          py-3
          rounded-xl
          border
          border-slate-300
          bg-white
          outline-none
          focus:ring-2
          focus:ring-blue-500
          transition
        "
      />
    </div>
  );
}

export default SearchBar;