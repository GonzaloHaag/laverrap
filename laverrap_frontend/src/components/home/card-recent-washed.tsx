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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useWashed } from "@/hooks";
import { formatMoney, formatWashingStatus } from "@/utils/formatters";
import { Link } from "react-router";

const COLSPAN = 4;
export const CardRecentWashed = () => {
  const { washed, isLoading, error } = useWashed();

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
            Error al cargar los lavados
          </TableCell>
        </TableRow>
      );
    }
    if (washed && washed.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={COLSPAN}>No se encontraron resultados</TableCell>
        </TableRow>
      );
    }
    return (
      washed &&
      washed.map((washing) => (
        <TableRow key={washing.id}>
          <TableCell className="w-5">#{washing.id}</TableCell>
          <TableCell>{washing.client.name}</TableCell>
          <TableCell className="font-medium">
            {formatMoney(washing.service.price ?? 0)}
          </TableCell>
          <TableCell>{formatWashingStatus(washing.status)}</TableCell>
        </TableRow>
      ))
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos lavados</CardTitle>
        <CardDescription>Lavados recientes</CardDescription>
      </CardHeader>
      <CardContent>
        <Table className="h-full max-h-80 overflow-y-auto">
          <TableCaption>
            <Link
              to={"/washed"}
              title="Ver todos los lavados"
              className="w-full text-blue-600 hover:underline"
            >
              Ver todos
            </Link>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>N°</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>{renderContent()}</TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
