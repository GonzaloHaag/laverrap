import { useState } from "react";
import type { Employee } from "@/schemas";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui";
import { useEmployees } from "@/hooks";
import { AlertDialogConfirm } from "../shared";
import { employeeService } from "@/services";
import { toast } from "sonner";
import { FormEmployee } from "./form-employee";
interface Props {
  employee: Employee;
}
export const ColumnEmployeeActions = ({ employee }: Props) => {
  const { mutate } = useEmployees();
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen((prev) => !prev);
  };
  const onClickConfirmUpdateStatus = async () => {
    await employeeService.updateStatus({ id: employee.id });
    mutate();
    toast.success("Empleado actualizado correctamente.");
  };
  const isInactive = employee.status === "INACTIVE";
  return (
    <>
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
    </>
  );
};
