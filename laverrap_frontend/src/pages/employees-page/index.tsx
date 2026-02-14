import { useState } from "react";
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { PlusCircleIcon } from "lucide-react";
import {
  columns,
  EmployeeFilters,
  FormEmployee,
  SectionCards,
} from "@/components/employees";
import { useEmployees } from "@/hooks";
import { DataTable } from "@/components/shared";

export const EmployeesPage = () => {
  const { isLoading, error, employees, total, totalActive, totalInactive } =
    useEmployees();
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de empleados</CardTitle>
        <CardDescription>
          Administra los empleados de tu lavadero
        </CardDescription>
        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button" title="Agregar cliente">
                <PlusCircleIcon />
                Agregar empleado
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nuevo empleado</DialogTitle>
                <DialogDescription>
                  Colocá los detalles del nuevo empleado
                </DialogDescription>
              </DialogHeader>
              <FormEmployee employee={null} closeDialog={closeDialog} />
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <SectionCards
          isLoading={isLoading}
          total={total ?? 0}
          totalActive={totalActive ?? 0}
          totalInactive={totalInactive ?? 0}
        />
        <DataTable
          isLoading={isLoading}
          error={error}
          columns={columns}
          data={employees || []}
          filterComponent={EmployeeFilters}
        />
      </CardContent>
    </Card>
  );
};
