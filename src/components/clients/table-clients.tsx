import { TableBodyClients } from "./table-body-clients";
import type { ClientWithWashes } from "@/types/client";

interface TableClientsProps {
  clients: ClientWithWashes[];
  isLoading: boolean;
  isError: boolean;
  userId: string;
}
export const TableClients = ({
  clients,
  isLoading,
  isError,
  userId,
}: TableClientsProps) => {
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
              Estado
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <TableBodyClients
          clients={clients}
          isLoading={isLoading}
          isError={isError}
          userId={userId}
        />
      </table>
    </div>
  );
};
