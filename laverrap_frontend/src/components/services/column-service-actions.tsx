import { useState } from "react";
import type { Service } from "@/schemas";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui";
import { FormService } from "./form-service";
import { AlertDialogConfirm } from "../shared";
import { serviceService } from "@/services";
import { toast } from "sonner";
import { useServices } from "@/hooks";

interface Props {
  service: Service;
}
export const ColumnServiceActions = ({ service }: Props) => {
  const { mutate } = useServices();
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen((prev) => !prev);
  };
  const onClickConfirmDeleteService = async () => {
    await serviceService.delete({ id: service.id });
    mutate();
    toast.success("Servicio eliminado correctamente.");
  };
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
            <DialogTitle>Editar servicio</DialogTitle>
            <DialogDescription>
              Modificá los detalles del cliente seleccionado
            </DialogDescription>
          </DialogHeader>
          <FormService service={service} closeDialog={closeDialog} />
        </DialogContent>
      </Dialog>
      <AlertDialogConfirm
        onClickConfirm={onClickConfirmDeleteService}
        isRestore={false}
      />
    </>
  );
};
