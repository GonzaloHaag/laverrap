import type { ChangeEvent } from "react";
import { STATUS } from "@/utils/consts";
import { InputSearch } from "../shared";
import { NativeSelect, NativeSelectOption } from "../ui";
import type { Table } from "@tanstack/react-table";
interface Props<TData> {
  table: Table<TData>;
}
export const EmployeeFilters = <TData,>({ table }: Props<TData>) => {
  const onChangeFilterName = (event: ChangeEvent<HTMLInputElement>) => {
    table.getColumn("name")?.setFilterValue(event.target.value);
  };

  const onChangeFilterStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    table.getColumn("status")?.setFilterValue(event.target.value);
  };

  return (
    <div className="flex items-center gap-x-4">
      <InputSearch
        placeholder="Buscar empleado..."
        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
        onChange={onChangeFilterName}
      />
      <NativeSelect
        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
        onChange={onChangeFilterStatus}
      >
        <NativeSelectOption value="">Seleccionar estado</NativeSelectOption>
        {STATUS.map((type) => (
          <NativeSelectOption key={type.id} value={type.value}>
            {type.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
};
