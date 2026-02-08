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
import { MailIcon } from "lucide-react";
import type { Client } from "@/schemas";
import { Link } from "react-router";
import { AlertDialogConfirm } from "@/components/shared";
import { toast } from "sonner";
import { FormClient } from "./form-client";
import { useClients } from "@/hooks";
import { clientService } from "@/services";
import { formatStatus } from "@/utils/formatters";
import { Badge } from "@/components/ui/badge";

interface Props {
  client: Client;
}
export const TableRowClient = ({ client }: Props) => {
  const [open, setOpen] = useState(false);

  const { mutate } = useClients();
  const onClickConfirmUpdateStatus = async () => {
    await clientService.updateStatus({ id: client.id });
    mutate();
    toast.success("Estado del cliente actualizado con éxito");
  };
  const closeDialog = () => {
    setOpen((prev) => !prev);
  };
  const isInactive = client.status === "INACTIVE";
  return (
    <TableRow className={isInactive ? "line-through text-gray-500" : ""}>
      <TableCell className="font-medium">{client.name}</TableCell>
      <TableCell>
        <div className="flex items-center gap-x-2">
          <MailIcon size={16} className="text-gray-400" />
          <Link
            to={`mailto:${client.email}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {client.email}
          </Link>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col gap-y-1">
          {client.car_model}
          <span className="text-xs bg-muted/50 px-2 py-1 rounded-full w-max">
            {client.car_plate}
          </span>
        </div>
      </TableCell>
      <TableCell className="font-medium text-center">
        {client._count.washed}
      </TableCell>
      <TableCell className="font-medium">{"12/06/2024"}</TableCell>
      <TableCell>
        <Badge variant={isInactive ? "destructive" : "default"}>
          {formatStatus(client.status)}
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
              <DialogTitle>Editar cliente</DialogTitle>
              <DialogDescription>
                Modificá los detalles del cliente seleccionado
              </DialogDescription>
            </DialogHeader>
            <FormClient client={client} closeDialog={closeDialog} />
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
