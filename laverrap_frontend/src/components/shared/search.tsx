import { SearchIcon } from "lucide-react";
import { Input } from "../ui";
interface SearchProps {
  placeholder: string;
}
export const Search = ({ placeholder }: SearchProps) => {
  return (
    <div className="relative w-full md:max-w-md">
      <SearchIcon size={18} className="absolute top-0 bottom-0 my-auto mx-0 left-2 text-gray-500" />
      <Input type="search" placeholder={placeholder} className="px-8" />
    </div>
  );
};
