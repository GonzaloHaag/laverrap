import type { ChangeEvent } from "react";
import { InputSearch } from "../shared";
import { NativeSelect, NativeSelectOption } from "../ui";
import type { Table } from "@tanstack/react-table";

interface Props<TData> {
  table: Table<TData>;
}
export const WashingFilters = <TData,>({ table }: Props<TData>) => {
  const onChangeFilterClient = (event: ChangeEvent<HTMLInputElement>) => {
    table.getColumn("clientName")?.setFilterValue(event.target.value);
  };

  const onChangeFilterStatus = (event: ChangeEvent<HTMLSelectElement>) => {
    table.getColumn("status")?.setFilterValue(event.target.value);
  };

  return (
    <div className="flex items-center gap-x-4">
      <InputSearch
        placeholder="Buscar por nombre de cliente..."
        value={(table.getColumn("clientName")?.getFilterValue() as string) ?? ""}
        onChange={onChangeFilterClient}
      />
      <NativeSelect
        value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
        onChange={onChangeFilterStatus}
      >
        <NativeSelectOption value="">Todos los estados</NativeSelectOption>
        <NativeSelectOption value="PENDING">Pendiente</NativeSelectOption>
        <NativeSelectOption value="IN_PROGRESS">En progreso</NativeSelectOption>
        <NativeSelectOption value="COMPLETED">Completado</NativeSelectOption>
        <NativeSelectOption value="CANCELLED">Cancelado</NativeSelectOption>
      </NativeSelect>
    </div>
  );
};
