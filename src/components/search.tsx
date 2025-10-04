import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { useSearchParams } from "react-router";
import type { ChangeEvent } from "react";
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
    <InputGroup className="w-full max-w-xl">
      <InputGroupInput
        placeholder={placeholder}
        onChange={handleSearch}
        defaultValue={searchParams.get("search")?.toString()}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  );
};
