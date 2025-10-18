import { LoaderCircleIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteWashingMutation } from "@/hooks/mutations";
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
interface ButtonDeleteWashingProps {
  washingId: number;
}
export const ButtonDeleteWashing = ({
  washingId,
}: ButtonDeleteWashingProps) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prevState) => !prevState);
  };
  const deleteWashingMutation = useDeleteWashingMutation({ toggleModal });
  const onClickOnlyDeleteWashing = () => {
    deleteWashingMutation.mutate(washingId);
  };
  return (
    <AlertDialog open={open} onOpenChange={toggleModal}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          size={"icon-sm"}
          title="Borrar"
        >
          <Trash2Icon className="text-red-600" />
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
            onClick={onClickOnlyDeleteWashing}
            disabled={deleteWashingMutation.isPending}
          >
            {deleteWashingMutation.isPending ? (
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
