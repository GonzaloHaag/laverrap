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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  client: Client;
}
export const TableRowClient = ({ client }: Props) => {
  const [open, setOpen] = useState(false);
  const [openAlertDialogDelete, setOpenAlertDialogDelete] = useState(false);

  // const onClickDelete = async () => {
  //   try {

  //     setOpenAlertDialogDelete(false);
  //     toast.success("Servicio eliminado con éxito");
  //   } catch (error) {
  //     console.error("Error deleting service:", error);
  //     toast.error("Hubo un error al eliminar el servicio");
  //   }
  // };

  console.log("client", client);

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
            <span>{client.email }</span>
          </div>
        </div>
      </TableCell>
      <TableCell>{`${client.car_model} -${client.car_plate}`}</TableCell>
      <TableCell className="font-medium">{client._count.washed}</TableCell>
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
              <DialogTitle>Editar servicio</DialogTitle>
              <DialogDescription>
                Modificá los detalles del servicio seleccionado
              </DialogDescription>
            </DialogHeader>
            {/* <FormService service={service} closeDialog={closeDialog} /> */}
          </DialogContent>
        </Dialog>
        <AlertDialog
          open={openAlertDialogDelete}
          onOpenChange={setOpenAlertDialogDelete}
        >
          <AlertDialogTrigger asChild>
            <Button
              variant={"link"}
              size={"sm"}
              className="text-red-600 p-0 ml-2"
            >
              Eliminar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                ¿Estás seguro de eliminar este servicio?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente
                el servicio seleccionado.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="min-w-24">Cancel</AlertDialogCancel>
              <AlertDialogAction className="min-w-24">
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
};
