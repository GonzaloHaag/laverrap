import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Employee } from "@/schemas";
import { TableRowEmployee } from "./table-row-employee";

interface Props {
  isLoading: boolean;
  error: string | null;
  employees: Employee[];
}

export const TableEmployees = ({ isLoading, error, employees }: Props) => {
  if (isLoading) {
    return (
      <span className="text-center text-gray-400">Cargando empleados...</span>
    );
  }
  if (error) {
    return (
      <span className="text-center text-red-500">
        Error al cargar los empleados
      </span>
    );
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Horario laboral</TableHead>
          <TableHead>Lavados</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employees.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No se encontraron empleados.
            </TableCell>
          </TableRow>
        ) : (
          employees.map((employee) => (
            <TableRowEmployee key={employee.id} employee={employee} />
          ))
        )}
      </TableBody>
    </Table>
  );
};
