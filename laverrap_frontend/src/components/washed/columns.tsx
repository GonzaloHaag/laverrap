import type { Washing } from "@/schemas";
import { type ColumnDef } from "@tanstack/react-table";
import { ColumnWashingActions } from "./column-washing-actions";
import { formatMoney, formatWashingStatus } from "@/utils/formatters";
import { CheckIcon } from "lucide-react";

export const columns: ColumnDef<Washing>[] = [
  {
    accessorKey: "clientName",
    accessorFn: (row) => row.client.name,
    header: "Cliente",
  },
  {
    accessorKey: "client.car_model",
    header: "Vehículo",
    cell: ({ row }) => {
      return (
        <div>
          {row.original.client.car_model} - {row.original.client.car_plate}
        </div>
      );
    },
  },
  {
    accessorKey: "employee.name",
    header: "Empleado",
  },
  {
    accessorKey: "service.price",
    header: "Precio",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {formatMoney(row.original.service.price ?? 0)}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    filterFn: "equals",
    cell: ({ row }) => {
      return <span>{formatWashingStatus(row.original.status)}</span>;
    },
  },
  {
    accessorKey: "notify",
    header: "Notificar",
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.original.notify && <CheckIcon size={20} />}
        </div>
      );
    },
  },
  {
    accessorKey: "emailSentAt",
    header: "Estado email",
    cell: ({ row }) => {
      return row.original.emailSentAt ? (
        <span className="text-green-500">Enviado</span>
      ) : (
        <span className="text-gray-500">No enviado</span>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <ColumnWashingActions washing={row.original} />;
    },
  },
];
