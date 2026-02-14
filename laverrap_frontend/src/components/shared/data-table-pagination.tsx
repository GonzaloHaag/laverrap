import { type Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Button, NativeSelect, NativeSelectOption } from "../ui";
import type { ChangeEvent } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const onChangePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    table.setPageSize(Number(event.target.value));
  };
  return (
    <div className="flex items-center gap-x-6 lg:gap-x-8">
      <div className="flex items-center gap-x-2">
        <p className="text-sm font-medium">Mostrando</p>
        <NativeSelect
          value={`${table.getState().pagination.pageSize}`}
          onChange={onChangePageSize}
        >
          {[10, 20, 25, 30, 40, 50].map((pageSize) => (
            <NativeSelectOption key={pageSize} value={`${pageSize}`}>
              {pageSize}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Página {table.getState().pagination.pageIndex + 1} de{" "}
        {table.getPageCount()}
      </div>
      <div className="flex items-center gap-x-2">
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 lg:flex"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-8"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="hidden size-8 lg:flex"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  );
}
