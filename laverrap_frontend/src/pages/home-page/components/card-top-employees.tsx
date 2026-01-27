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

export const CardTopEmployees = () => {
  const { isLoading, error, employees } = useEmployees();
  const renderContent = () => {
    if (isLoading) {
      return <div>Cargando datos...</div>;
    }
    if (error) {
      return <div className="text-red-600">Error al cargar los empleados</div>;
    }
    if (employees && employees.length === 0) {
      return <div>No se encontraron empleados</div>;
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
