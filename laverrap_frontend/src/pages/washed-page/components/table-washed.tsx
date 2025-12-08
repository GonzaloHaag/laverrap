import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Washing } from "@/schemas";
import { TableRowWashing } from "./table-row-washing";
import { EmptyMessage } from "@/components/shared";

interface Props {
  isLoading: boolean;
  error: string | null;
  washed: Washing[];
}
export const TableWashed = ({ isLoading, error, washed }: Props) => {
  if (isLoading) {
    return (
      <span className="text-center text-gray-400">Cargando lavados...</span>
    );
  }
  if (error) {
    return (
      <span className="text-center text-red-500">
        Error al cargar los lavados
      </span>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cliente</TableHead>
          <TableHead>Vehículo</TableHead>
          <TableHead>Empleado</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {washed.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              <EmptyMessage />
            </TableCell>
          </TableRow>
        ) : (
          washed.map((washing) => (
            <TableRowWashing key={washing.id} washing={washing} />
          ))
        )}
      </TableBody>
    </Table>
  );
};
