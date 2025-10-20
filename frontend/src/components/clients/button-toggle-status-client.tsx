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
import { useToggleStatusClientMutation } from "@/hooks/mutations";

interface ButtonToggleStatusClientProps {
  clientId: number;
  clientStatus: "active" | "inactive";
}
export const ButtonToggleStatusClient = ({
  clientId,
  clientStatus,
}: ButtonToggleStatusClientProps) => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen((prevState) => !prevState);
  };
  const toggleClientStatusMutation = useToggleStatusClientMutation({
    toggleModal,
  });
  const onClickToggleClientStatus = () => {
    toggleClientStatusMutation.mutate({
      clientId,
      status: clientStatus === "active" ? "inactive" : "active",
    });
  };
  return (
    <AlertDialog open={open} onOpenChange={toggleModal}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant={"link"}
          title={clientStatus === "active" ? "Desactivar" : "Activar"}
          className="p-0"
        >
          {clientStatus === "active" ? "Desactivar" : "Activar"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Se cambiará el estado del cliente a $
            {clientStatus === "active" ? "inactivo" : "activo"}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="min-w-32" title="Cancelar">
            Cancelar
          </AlertDialogCancel>
          <Button
            type="button"
            className={`min-w-32 ${buttonVariants({
              variant: clientStatus === "active" ? "destructive" : "success",
            })}`}
            title={clientStatus === "active" ? "Desactivar" : "Activar"}
            onClick={onClickToggleClientStatus}
            disabled={toggleClientStatusMutation.isPending}
          >
            {toggleClientStatusMutation.isPending ? (
              <LoaderCircleIcon className="animate-spin" />
            ) : clientStatus === "active" ? (
              "Desactivar"
            ) : (
              "Activar"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
