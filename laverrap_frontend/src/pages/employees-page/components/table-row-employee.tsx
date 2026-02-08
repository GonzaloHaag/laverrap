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
import { AlertDialogConfirm } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
interface Props {
  employee: Employee;
}
export const TableRowEmployee = ({ employee }: Props) => {
  const { mutate } = useEmployees();
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen((prev) => !prev);
  };

  const onClickConfirmUpdateStatus = async () => {
    await employeeService.updateStatus({
      id: employee.id,
    });
    toast.success("Estado del empleado actualizado con éxito");
    mutate();
  };

  const isInactive = employee.status === "INACTIVE";
  return (
    <TableRow className={isInactive ? "line-through text-gray-500" : ""}>
      <TableCell>{employee.name}</TableCell>
      <TableCell>
        {employee.entry_time} - {employee.departure_time}
      </TableCell>
      <TableCell className="text-center">{employee._count.washed}</TableCell>
      <TableCell>
        <Badge variant={isInactive ? "destructive" : "default"}>
          {formatStatus(employee.status)}
        </Badge>
      </TableCell>
      <TableCell>
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
        {!isInactive ? (
          <AlertDialogConfirm
            onClickConfirm={onClickConfirmUpdateStatus}
            isRestore={false}
          />
        ) : (
          <AlertDialogConfirm
            onClickConfirm={onClickConfirmUpdateStatus}
            isRestore={true}
          />
        )}
      </TableCell>
    </TableRow>
  );
};
