import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Employee } from "@/schemas";
import { FormEmployee } from "./form-employee";
import { formatStatus } from "@/utils/formatters";
import { useEmployees } from "@/hooks";
import { employeeService } from "@/services";
import { toast } from "sonner";
interface Props {
  employee: Employee;
}
export const TableRowEmployee = ({ employee }: Props) => {
  const { mutate } = useEmployees();
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen((prev) => !prev);
  };

  const onClickChangeStatus = async () => {
    try {
      await employeeService.changeStatus({
        id: employee.id,
      });
      toast.success("Estado del empleado actualizado con éxito");
      mutate();
    } catch (error) {
      console.error("Error updating employee status:", error);
    }
  };
  return (
    <TableRow>
      <TableCell>{employee.name}</TableCell>
      <TableCell>
        {employee.entry_time} - {employee.departure_time}
      </TableCell>
      <TableCell>{employee._count.washed}</TableCell>
      <TableCell>
        <span
          className={
            employee.status === "ACTIVE"
              ? "text-green-600 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {formatStatus(employee.status)}
        </span>
      </TableCell>
      <TableCell>
        {/* Actions can be added here in the future */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant={"link"} size={"sm"} className="p-0">
              Editar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar empleado</DialogTitle>
              <DialogDescription>
                Modificá los detalles del empleado seleccionado
              </DialogDescription>
            </DialogHeader>
            {/* <FormService service={service} closeDialog={closeDialog} /> */}
            <FormEmployee employee={employee} closeDialog={closeDialog} />
          </DialogContent>
        </Dialog>
        <Button
          variant={"link"}
          size={"sm"}
          className={`p-0 ml-2 ${
            employee.status === "ACTIVE" ? "text-red-600" : "text-green-600"
          }`}
          onClick={onClickChangeStatus}
        >
          {employee.status === "ACTIVE" ? "Desactivar" : "Activar"}
        </Button>
      </TableCell>
    </TableRow>
  );
};
