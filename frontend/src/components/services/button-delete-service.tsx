import { LoaderCircleIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";
import { buttonVariants } from "@/lib/consts";
import { useDeleteServiceMutation } from "@/hooks/mutations";
interface ButtonDeleteServiceProps {
  serviceId: number;
}
export const ButtonDeleteService = ({
  serviceId,
}: ButtonDeleteServiceProps) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prevState) => !prevState);
  };
  const deleteServiceMutation = useDeleteServiceMutation({ toggleModal });
  const onClickOnlyDeleteService = () => {
    deleteServiceMutation.mutate(serviceId);
  };
  return (
    <AlertDialog open={open} onOpenChange={toggleModal}>
      <AlertDialogTrigger asChild>
        <Button type="button" variant={"link"} title="Eliminar" className="p-0">
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Eliminará permanentemente el
            lavado y eliminará sus datos de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="min-w-32" title="Cancelar">
            Cancelar
          </AlertDialogCancel>
          <Button
            type="button"
            className={`min-w-32 ${buttonVariants({
              variant: "destructive",
            })}`}
            title="Eliminar"
            onClick={onClickOnlyDeleteService}
            disabled={deleteServiceMutation.isPending}
          >
            {deleteServiceMutation.isPending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : (
              "Eliminar"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
