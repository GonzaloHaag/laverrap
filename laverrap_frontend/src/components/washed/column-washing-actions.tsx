import { AlertDialogConfirm } from "@/components/shared";
import { Button } from "@/components/ui";
import { useWashed } from "@/hooks";
import type { Washing } from "@/schemas";
import { washingService } from "@/services";
import type { WashingStatus } from "@/types";
import { CheckIcon, HourglassIcon, XIcon } from "lucide-react";
import { useTransition, type MouseEvent } from "react";
import { toast } from "sonner";

interface Props {
  washing: Washing;
}
export const ColumnWashingActions = ({ washing }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { mutate } = useWashed();
  
  const updateWashingStatus = (event: MouseEvent<HTMLButtonElement>) => {
    if (washing.status === "COMPLETED") {
      toast.info("El lavado ya está completado, no se puede modificar.");
      return;
    }
    const status: WashingStatus = event.currentTarget.dataset
      .action as WashingStatus;
    startTransition(async () => {
      try {
        const updatedWashing = await washingService.updateStatus({
          id: washing.id,
          status,
        });
        if (updatedWashing) {
          mutate();
          toast.success("Estado del lavado actualizado con éxito");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onClickConfirmDelete = async () => {
    await washingService.delete({ id: washing.id });
    mutate();
    toast.success("Lavado eliminado con éxito");
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Cancelar"
        data-action="CANCELLED"
        onClick={updateWashingStatus}
        disabled={isPending}
      >
        <XIcon size={20} />
      </Button>
      <Button
        type="button"
        variant={"outline"}
        size={"icon"}
        title="En progreso"
        data-action="IN_PROGRESS"
        onClick={updateWashingStatus}
        disabled={isPending}
      >
        <HourglassIcon size={20} />
      </Button>
      <Button
        type="button"
        variant={"outline"}
        size={"icon"}
        title="Completar"
        data-action="COMPLETED"
        onClick={updateWashingStatus}
        disabled={isPending}
      >
        <CheckIcon size={20} />
      </Button>
      <AlertDialogConfirm
        onClickConfirm={onClickConfirmDelete}
        isRestore={false}
        isIcon={true}
      />
    </div>
  );
};
