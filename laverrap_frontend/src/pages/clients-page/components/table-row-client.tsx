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
import { MailIcon, PhoneIcon } from "lucide-react";
import type { Client } from "@/schemas";
import { Link } from "react-router";
import { AlertDialogDelete } from "@/components/shared";
import { toast } from "sonner";
import { FormClient } from "./form-client";

interface Props {
  client: Client;
}
export const TableRowClient = ({ client }: Props) => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen((prev) => !prev);
  };
  const onClickDelete = async () => {
    try {
      toast.success("Servicio eliminado con éxito");
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Hubo un error al eliminar el servicio");
    }
  };
  return (
    <TableRow>
      <TableCell className="font-medium">{client.name}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <PhoneIcon size={16} className="text-gray-400" />
            <span>{client.phone}</span>
          </div>
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
                Modificá los detalles del cliente| seleccionado
              </DialogDescription>
            </DialogHeader>
            <FormClient client={client} closeDialog={closeDialog} />
          </DialogContent>
        </Dialog>
        <AlertDialogDelete onClickDelete={onClickDelete} />
      </TableCell>
    </TableRow>
  );
};
