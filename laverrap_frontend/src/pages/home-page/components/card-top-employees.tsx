import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEmployees } from "@/hooks";
const COLSPAN = 2;

export const CardTopEmployees = () => {
  const { isLoading, error, employees } = useEmployees();
  const renderContent = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={COLSPAN} className="text-gray-500 text-center">
            Cargando datos...
          </TableCell>
        </TableRow>
      );
    }
    if (error) {
      return (
        <TableRow>
          <TableCell colSpan={COLSPAN} className="text-red-600 text-center">
            Error al cargar los empleados
          </TableCell>
        </TableRow>
      );
    }
    if (employees && employees.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={COLSPAN}>No se encontraron resultados</TableCell>
        </TableRow>
      );
    }
    return (
      employees &&
      employees.map((employee) => (
        <TableRow key={employee.id}>
          <TableCell>{employee.name}</TableCell>
          <TableCell>{employee._count.washed}</TableCell>
        </TableRow>
      ))
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>TOP empleados</CardTitle>
        <CardDescription>Rendimientos del mes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Empleado</TableHead>
              <TableHead>Lavados</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderContent()}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
