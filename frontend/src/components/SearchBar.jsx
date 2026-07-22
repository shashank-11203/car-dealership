function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by make..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  );
}

export default SearchBar;