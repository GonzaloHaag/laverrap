import type { ChangeEvent } from "react";
import { SERVICES_CATEGORY } from "@/utils/consts";
import { InputSearch } from "../shared";
import { NativeSelect, NativeSelectOption } from "../ui";
import type { Table } from "@tanstack/react-table";
interface Props<TData> {
  table: Table<TData>;
}
export const ServiceFilters = <TData,>({ table }: Props<TData>) => {
  const onChangeFilterName = (event: ChangeEvent<HTMLInputElement>) => {
    table.getColumn("name")?.setFilterValue(event.target.value);
  };

  const onChangeFilterCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.name);
    table.getColumn("category")?.setFilterValue(event.target.value);
  };

  return (
    <div className="flex items-center gap-x-4">
      <InputSearch
        placeholder="Buscar por nombre de servicio..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={onChangeFilterName}
      />
      <NativeSelect
        value={(table.getColumn("category")?.getFilterValue() as string) ?? ""}
        onChange={onChangeFilterCategory}
      >
        <NativeSelectOption value="">Seleccionar categoría</NativeSelectOption>
        {SERVICES_CATEGORY.map((type) => (
          <NativeSelectOption key={type.id} value={type.value}>
            {type.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
};
