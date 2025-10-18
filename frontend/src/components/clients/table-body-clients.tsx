import { Button } from "../ui/button";
import type { ClientWithWashes } from "@/types/client";
import { Badge } from "../ui/badge";
import {
  STATUS_COLORS,
  STATUS_LABELS,
  VEHICLES_TYPES_LABELS,
} from "@/lib/consts";
import { Link } from "react-router";
import { ButtonEditClient } from "./button-edit-client";

interface TableBodyClientsProps {
  clients: ClientWithWashes[];
  isLoading: boolean;
  isError: boolean;
  userId:string;
}
export const TableBodyClients = ({
  clients,
  isLoading,
  isError,
  userId
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
               {
                client.phone ? (
                   <Link
                  to={`tel:${client.phone}`}
                  className="text-blue-600 hover:underline"
                  title={`Contactar a ${client.name} por teléfono`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {client.phone}
                </Link>
                ) : (
                  <span className="text-muted-foreground">Sin teléfono</span>
                )
               }
              </div>
            </td>
            <td className="px-6 py-2">
              <div className="flex flex-col gap-y-1">
                <span>
                  {VEHICLES_TYPES_LABELS[client.vehicle_type]}
                  {client.model_brand && ` - ${client.model_brand}`}
                </span>
                <Badge variant={"outline"}>{client.patent}</Badge>
              </div>
            </td>
            <td className="px-6 py-2">{client.washed[0].count ?? 0}</td>
            <td className="px-6 py-2">
              <Badge className={STATUS_COLORS[client.status]}>
                {STATUS_LABELS[client.status]}
              </Badge>
            </td>
            <td className="px-6 py-2">
              <div className="flex items-center gap-x-2">
                <ButtonEditClient userId={userId} client={client} />
                <Button
                  type="button"
                  variant={"link"}
                  title="Desactivar"
                  className="p-0"
                >
                  Desactivar
                </Button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr className="odd:bg-white even:bg-gray-50 border-gray-200">
          <td
            colSpan={6}
            className="px-6 py-4 text-center text-muted-foreground"
          >
            No se encontraron resultados
          </td>
        </tr>
      )}
    </tbody>
  );
};
