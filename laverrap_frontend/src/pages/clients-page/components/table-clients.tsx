import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Client } from "@/schemas";
import { TableRowClient } from "./table-row-client";

interface Props {
  isLoading: boolean;
  error: string | null;
  clients: Client[];
}

export const TableClients = ({ isLoading, error, clients }: Props) => {
  if (isLoading) {
    return (
      <span className="text-center text-gray-400">Cargando clientes...</span>
    );
  }
  if (error) {
    return (
      <span className="text-center text-red-500">
        Error al cargar los clientes
      </span>
    );
  }
  return (
    <Table>
      <TableCaption>Listado de tus servicios.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Contacto</TableHead>
          <TableHead>Vehículo</TableHead>
          <TableHead>Lavados</TableHead>
          <TableHead>Último lavado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {clients.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-500">
              No hay clientes disponibles.
            </TableCell>
          </TableRow>
        ) : (
          clients.map((client) => (
            <TableRowClient key={client.id} client={client} />
          ))
        )}
      </TableBody>
    </Table>
  );
};
