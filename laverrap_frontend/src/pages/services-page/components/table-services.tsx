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
import { formatCategoryService, formatMoney } from "@/utils/formatters";
import { ClockIcon } from "lucide-react";

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
            <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell>
              <TableCell>{service.description}</TableCell>
              <TableCell>{formatCategoryService(service.category)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-x-0">
                  <ClockIcon size={16} className="text-gray-400" />
                  <span className="ml-1">{service.duration} min</span>
                </div>
              </TableCell>
              <TableCell className="font-medium">{formatMoney(service.price)}</TableCell>
              <TableCell>
                <button className="text-blue-500 hover:underline mr-2">
                  Editar
                </button>
                <button className="text-red-500 hover:underline">
                  Eliminar
                </button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
