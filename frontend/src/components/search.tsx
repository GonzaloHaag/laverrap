import { SearchIcon } from "lucide-react";
import { useSearchParams } from "react-router";
import type { ChangeEvent } from "react";
import { Input } from "./ui/input";
interface SearchProps {
  placeholder: string;
}
export const Search = ({ placeholder }: SearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const term = event.target.value;
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };
  return (
    <div className="relative w-full">
      <SearchIcon size={16} className="absolute bottom-0 top-0 my-auto left-2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={searchParams.get("search")?.toString()}
        className="pl-8"
      />
    </div>
  );
};
