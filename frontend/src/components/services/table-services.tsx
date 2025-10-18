import type { Service } from "@/types/service";
import { TableBodyServices } from "./table-body-services";

interface TableServicesProps {
    services: Service[];
    isLoading:boolean;
    isError:boolean;
    userId:string;
}
export const TableServices = ({ services, isLoading, isError, userId } : TableServicesProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Descripción
            </th>
            <th scope="col" className="px-6 py-3">
              Categoría
            </th>
            <th scope="col" className="px-6 py-3">
              Precio
            </th>
             <th scope="col" className="px-6 py-3">
              Duración
            </th>
            <th scope="col" className="px-6 py-3">
              Acciones
            </th>
          </tr>
        </thead>
        <TableBodyServices services={services} isLoading={isLoading} isError={isError} userId={userId} />
      </table>
    </div>
  );
};
