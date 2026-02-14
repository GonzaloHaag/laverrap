import type { Service } from "@/schemas";
import { type ColumnDef } from "@tanstack/react-table";
import { ColumnServiceActions } from "./column-service-actions";
import { Badge } from "../ui/badge";
import { formatCategoryService } from "@/utils/formatters";

export const columns: ColumnDef<Service>[] = [
  {
    accessorKey: "name",
    header: "Servicio",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "category",
    header: "Categoría",
    filterFn: "equals",
    cell: ({ row }) => {
      return (
        <Badge variant={"default"}>
          {formatCategoryService(row.original.category)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duración",
    cell: ({ row }) => {
      const duration = row.original.duration;
      return <div>{duration} Minutos</div>;
    },
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return <ColumnServiceActions service={row.original} />;
    },
  },
];
