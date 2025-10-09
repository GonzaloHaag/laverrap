import { FlagIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { useUpdateWashingStatusMutation } from "@/hooks/mutations";
interface ButtonFinishWashingProps {
  washingId: number;
  is_completed: boolean;
}
export const ButtonFinishWashing = ({
  washingId,
  is_completed,
}: ButtonFinishWashingProps) => {
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((prevState) => !prevState);
  };

  const updateWashingStatusMutation = useUpdateWashingStatusMutation({
    toggleModal,
  });

  const onClickOnlyFinishWashing = () => {
    updateWashingStatusMutation.mutate({
      washingId: washingId,
      status: "completed",
    });
  };
  return (
    <Dialog open={open} onOpenChange={toggleModal}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant={"outline"}
          size={"icon-sm"}
          title="Finalizar"
          disabled={is_completed}
        >
          <FlagIcon className="text-slate-800" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Finalizar lavado</DialogTitle>
          <DialogDescription>
            Desea finalizar el lavado y notificar al cliente por correo?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant={"outline"}
              title="Cancelar"
              className="min-w-32"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type="button"
            title="Solo finalizar"
            className="min-w-32"
            onClick={onClickOnlyFinishWashing}
            disabled={updateWashingStatusMutation.isPending}
          >
            {updateWashingStatusMutation.isPending
              ? "Finalizando..."
              : "Solo finalizar"}
          </Button>
          <Button
            type="button"
            title="Finalizar y notificar"
            className="min-w-32"
          >
            Finalizar y notificar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
