import type { Client } from "@/schemas";
import { type ColumnDef } from "@tanstack/react-table";
import { ColumnClientActions } from "./column-client-actions";
import { Badge } from "../ui/badge";
import { formatStatus } from "@/utils/formatters";
import { Link } from "react-router";
import { MailIcon } from "lucide-react";

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Cliente",
  },
  {
    accessorKey: "email",
    header: "Contacto",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          <MailIcon size={16} className="text-gray-400" />
          <Link
            to={`mailto:${row.original.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {row.original.email}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "car_model",
    header: "Vehículo",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col gap-y-1">
          {row.original.car_model}
          <span className="text-xs bg-muted/50 px-2 py-1 rounded-full w-max">
            {row.original.car_plate}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "_count.washed",
    header: "Lavados",
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.original._count.washed}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    filterFn: "equals",
    cell: ({ row }) => {
      const isInactive = row.original.status === "INACTIVE";
      return (
        <Badge variant={isInactive ? "destructive" : "default"}>
          {formatStatus(row.original.status)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <ColumnClientActions client={row.original} />;
    },
  },
];
