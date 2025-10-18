import { useSearchParams } from "react-router";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
interface SelectFilterProps {
    options:{ id:number, label:string, value:string }[];
    urlSet:string;
    placeholder:string;
}
export const SelectFilter = ({ options, urlSet, placeholder }:SelectFilterProps) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleSelectValue = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value !== "all") {
            params.set(urlSet, value);
        } else {
            params.delete(urlSet);
        }
        setSearchParams(params);
    };

    const defaultValue = searchParams.get(urlSet)?.toString() || "";
  return (
    <Select defaultValue={defaultValue} onValueChange={(val) => handleSelectValue(val)}>
      <SelectTrigger className="w-full md:max-w-[200px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {
            options.map((option) => (
                <SelectItem key={option.id} value={option.value}>{option.label}</SelectItem>
            ))
        }
      </SelectContent>
    </Select>
  );
};
