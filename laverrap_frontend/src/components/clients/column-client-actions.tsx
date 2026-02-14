import { useState } from "react";
import type { Client } from "@/schemas";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui";
import { FormClient } from "./form-client";
import { AlertDialogConfirm } from "../shared";
import { clientService } from "@/services";
import { toast } from "sonner";
import { useClients } from "@/hooks";

interface Props {
  client: Client;
}
export const ColumnClientActions = ({ client }: Props) => {
  const { mutate } = useClients();
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen((prev) => !prev);
  };
  const onClickConfirmUpdateStatus = async () => {
    await clientService.updateStatus({ id: client.id });
    mutate();
    toast.success("Estado del cliente actualizado con éxito");
  };
  const isInactive = client.status === "INACTIVE";
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
    </>
  );
};
