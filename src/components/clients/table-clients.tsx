import { TableBodyClients  } from "./table-body-clients";
import type { Client } from "@/types/client";

interface TableServicesProps {
    clients: Client[];
    isLoading:boolean;
    isError:boolean;
}
export const TableClients = ({ clients, isLoading, isError } : TableServicesProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Contacto
            </th>
            <th scope="col" className="px-6 py-3">
              Vehículo
            </th>
            <th scope="col" className="px-6 py-3">
              Lavados
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <TableBodyClients clients={clients} isLoading={isLoading} isError={isError} />
      </table>
    </div>
  );
};
