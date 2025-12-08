import { TableCell, TableRow } from "@/components/ui/table";
import type { Washing } from "@/schemas";
import { formatMoney } from "@/utils/formatters";

interface Props {
  washing: Washing;
}
export const TableRowWashing = ({ washing }: Props) => {
  return (
    <TableRow key={washing.id}>
      <TableCell>{washing.client.name}</TableCell>
      <TableCell>
        {washing.client.car_model} - {washing.client.car_plate}
      </TableCell>
      <TableCell>{washing.employee.name}</TableCell>
      <TableCell className="font-medium">
        {formatMoney(washing.service.price ?? 0)}
      </TableCell>
      <TableCell>
         {washing.status}
      </TableCell>
      <TableCell>{/* Actions can be added here in the future */}</TableCell>
    </TableRow>
  );
};
