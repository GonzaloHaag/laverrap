import { Button } from "../ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import type { Client } from "@/types/client";
import { Badge } from "../ui/badge";
import { VEHICLES_TYPES_LABELS } from "@/lib/consts";
import { Link } from "react-router";

interface TableBodyClientsProps {
  clients: Client[];
  isLoading: boolean;
  isError: boolean;
}
export const TableBodyClients = ({
  clients,
  isLoading,
  isError,
}: TableBodyClientsProps) => {
  if (isLoading) {
    return (
      <tbody>
        <tr className="odd:bg-white even:bg-gray-50 border-gray-200">
          <td
            colSpan={6}
            className="px-6 py-4 text-center text-muted-foreground"
          >
            Cargando...
          </td>
        </tr>
      </tbody>
    );
  }
  if (isError) {
    return (
      <tbody>
        <tr className="odd:bg-white even:bg-gray-50 border-gray-200">
          <td colSpan={6} className="px-6 py-4 text-center text-red-600">
            Ocurrió un error
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {clients.length > 0 ? (
        clients.map((client) => (
          <tr
            key={client.id}
            className="odd:bg-white even:bg-gray-50 border-gray-200"
          >
            <th
              scope="row"
              className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {client.name}
            </th>
            <td className="px-6 py-2">
              <div className="flex flex-col gap-y-1">
                <Link to={`mailto:${client.email}`} className="text-blue-600 hover:underline" title={`Enviar email a ${client.email}`} target="_blank" rel="noopener noreferrer">
                  {client.email}
                </Link>
                {client.phone && <span>{client.phone}</span>}
              </div>
            </td>
            <td className="px-6 py-2">
              <div className="flex flex-col gap-y-1">
                <span>{VEHICLES_TYPES_LABELS[client.vehicle_type]}{client.model_brand && ` - ${client.model_brand}`}</span>
                <Badge variant={"outline"}>{client.patent}</Badge>
              </div>
            </td>
            <td className="px-6 py-2">{20}</td>
            <td className="px-6 py-2">
              <div className="flex items-center gap-x-2">
                 <Button type="button" variant={"outline"} size={"icon-sm"} title="Editar">
                    <PencilIcon className="text-green-600" />
                 </Button>
                  <Button type="button" variant={"outline"} size={"icon-sm"} title="Eliminar">
                    <TrashIcon className="text-red-600" />
                 </Button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr className="odd:bg-white even:bg-gray-50 border-gray-200">
          <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">
            No se encontraron resultados
          </td>
        </tr>
      )}
    </tbody>
  );
};
