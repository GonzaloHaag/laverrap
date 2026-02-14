import type { ChangeEvent } from "react";
import { InputSearch } from "../shared";
import { NativeSelect, NativeSelectOption } from "../ui";
import type { Table } from "@tanstack/react-table";

interface Props<TData> {
  table: Table<TData>;
}
export const ClientFilters = <TData,>({ table }: Props<TData>) => {
  const onChangeFilterName = (event: ChangeEvent<HTMLInputElement>) => {
    table.getColumn("name")?.setFilterValue(event.target.value);
  };

  const onChangeFilterStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    table.getColumn("status")?.setFilterValue(event.target.value);
  };

  return (
    <div className="flex items-center gap-x-4">
      <InputSearch
        placeholder="Buscar cliente..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={onChangeFilterName}
      />
      <NativeSelect
        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
        onChange={onChangeFilterStatus}
      >
        <NativeSelectOption value="">Todos los estados</NativeSelectOption>
        <NativeSelectOption value="ACTIVE">Activo</NativeSelectOption>
        <NativeSelectOption value="INACTIVE">Inactivo</NativeSelectOption>
      </NativeSelect>
    </div>
  );
};
