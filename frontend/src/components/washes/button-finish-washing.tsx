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
import type { Washing } from "@/types/washing";
interface ButtonFinishWashingProps {
  washing: Washing;
  is_completed: boolean;
}
export const ButtonFinishWashing = ({
  washing,
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
      washingId: washing.id,
      status: "completed",
      notifyClient: false
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
            Aqui puedes finalizar el lavado del cliente. Luego podŕas notificarle.
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
              : "Finalizar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
