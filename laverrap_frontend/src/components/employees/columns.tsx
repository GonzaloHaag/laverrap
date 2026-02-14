import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import type { Employee } from "@/schemas";
import { formatStatus } from "@/utils/formatters";
import { ColumnEmployeeActions } from "./column-employee-actions";

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Servicio",
  },
  {
    id: "workingHours",
    header: "Horario laboral",
    cell: ({ row }) => {
      const employee = row.original;
      return (
        <div>
          {employee.entry_time} - {employee.departure_time}
        </div>
      );
    },
  },
  {
    id: "washingDone",
    header: "Lavados realizados",
    cell: ({ row }) => {
      const employee = row.original;
      return <div>{employee._count.washed}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    filterFn: "equals",
    cell: ({ row }) => {
      const employee = row.original;
      const isInactive = employee.status === "INACTIVE";
      return (
        <Badge variant={isInactive ? "destructive" : "default"}>
          {formatStatus(employee.status)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <ColumnEmployeeActions employee={row.original} />;
    },
  },
];
