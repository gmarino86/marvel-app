import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center px-2 py-1 border-b w-full">
      <Search className="w-5 h-5 text-gray-500" />
      <input
        type="text"
        placeholder="SEARCH A CHARACTER..."
        className="bg-transparent ml-2 outline-none w-full text-gray-700 placeholder-gray-500"
      />
    </div>
  );
}
