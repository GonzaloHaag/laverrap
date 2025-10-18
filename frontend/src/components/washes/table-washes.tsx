import type { Washing } from "@/types/washing";
import { TableBodyWashes } from "./table-body-washes";

interface TableWashesProps {
  washes: Washing[];
  isLoading: boolean;
  isError: boolean;
}
export const TableWashes = ({
  washes,
  isLoading,
  isError,
}: TableWashesProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Cliente
            </th>
            <th scope="col" className="px-6 py-3">
              Servicio
            </th>
            <th scope="col" className="px-6 py-3">
              Precio
            </th>
            <th scope="col" className="px-6 py-3">
              Fecha
            </th>
            <th scope="col" className="px-6 py-3">
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <TableBodyWashes
          washes={washes}
          isLoading={isLoading}
          isError={isError}
        />
      </table>
    </div>
  );
};
