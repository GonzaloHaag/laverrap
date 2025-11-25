import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Service } from "@/schemas";
import { TableRowService } from "./table-row-service";

interface Props {
  isLoading: boolean;
  error: string | null;
  services: Service[];
}

export const TableServices = ({ isLoading, error, services }: Props) => {
  if (isLoading) {
    return (
      <span className="text-center text-gray-400">Cargando servicios...</span>
    );
  }
  if (error) {
    return (
      <span className="text-center text-red-500">
        Error al cargar los servicios
      </span>
    );
  }
  return (
    <Table>
      <TableCaption>Listado de tus servicios.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-40">Servicio</TableHead>
          <TableHead>Descripción</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Duración</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-500">
              No hay servicios disponibles.
            </TableCell>
          </TableRow>
        ) : (
          services.map((service) => (
            <TableRowService key={service.id} service={service} />
          ))
        )}
      </TableBody>
    </Table>
  );
};
