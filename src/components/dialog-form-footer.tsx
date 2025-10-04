import { LoaderCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { DialogClose, DialogFooter } from "./ui/dialog";
interface DialogFormFooterProps {
  isPending: boolean;
}
export const DialogFormFooter = ({ isPending }: DialogFormFooterProps) => {
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button" variant="outline" title="Cancelar" className="min-w-28">
          Cancelar
        </Button>
      </DialogClose>
      <Button type="submit" title="Guardar" variant={"default"} className="min-w-28" disabled={isPending}>
        {isPending ? <LoaderCircleIcon className="animate-spin" /> : "Guardar"}
      </Button>
    </DialogFooter>
  );
};
