import { Search } from "lucide-react";
import { FormEvent, useRef } from "react";

interface Props {
  onSubmit?: (value: string) => void;
}

export default function SearchBar({ onSubmit }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (onSubmit && inputRef.current && inputRef.current.value.trim() !== "") {
      onSubmit(inputRef.current.value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center px-2 py-1 border-b w-full" data-testid="search-form">
      <Search className="w-5 h-5 text-gray-500" />
      <input
        type="text"
        placeholder="SEARCH A CHARACTER..."
        className="bg-transparent ml-2 outline-none w-full text-gray-700 placeholder-gray-500"
        ref={inputRef}
      />
    </form>
  );
}
