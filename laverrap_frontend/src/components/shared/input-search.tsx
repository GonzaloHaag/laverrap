import { SearchIcon } from "lucide-react";
import { Input } from "../ui";
import type { InputHTMLAttributes } from "react";

export const InputSearch = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="relative w-full md:max-w-md">
      <SearchIcon size={18} className="absolute top-0 bottom-0 my-auto mx-0 left-2 text-gray-500" />
      <Input {...props} type="search" className={`px-8 ${props.className ?? ""}`} />
    </div>
  );
};
