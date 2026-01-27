import { Button } from "@/components/ui";
import { TableCell, TableRow } from "@/components/ui/table";
import { useWashed } from "@/hooks";
import type { Washing } from "@/schemas";
import { washingService } from "@/services";
import type { WashingStatus } from "@/types";
import { formatMoney, formatWashingStatus } from "@/utils/formatters";
import { CheckIcon } from "lucide-react";
import { useTransition, type MouseEvent } from "react";
import { toast } from "sonner";

interface Props {
  washing: Washing;
}
export const TableRowWashing = ({ washing }: Props) => {
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
  return (
    <TableRow>
      <TableCell>{washing.client.name}</TableCell>
      <TableCell>
        {washing.client.car_model} - {washing.client.car_plate}
      </TableCell>
      <TableCell>{washing.employee.name}</TableCell>
      <TableCell className="font-medium">
        {formatMoney(washing.service.price ?? 0)}
      </TableCell>
      <TableCell>
        {isPending ? (
          <svg
            fill="hsl(228, 97%, 42%)"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
          >
            <circle cx="4" cy="12" r="3" opacity="1">
              <animate
                id="spinner_qYjJ"
                begin="0;spinner_t4KZ.end-0.25s"
                attributeName="opacity"
                dur="0.75s"
                values="1;.2"
                fill="freeze"
              />
            </circle>
            <circle cx="12" cy="12" r="3" opacity=".4">
              <animate
                begin="spinner_qYjJ.begin+0.15s"
                attributeName="opacity"
                dur="0.75s"
                values="1;.2"
                fill="freeze"
              />
            </circle>
            <circle cx="20" cy="12" r="3" opacity=".3">
              <animate
                id="spinner_t4KZ"
                begin="spinner_qYjJ.begin+0.3s"
                attributeName="opacity"
                dur="0.75s"
                values="1;.2"
                fill="freeze"
              />
            </circle>
          </svg>
        ) : (
          <span>{formatWashingStatus(washing.status)}</span>
        )}
      </TableCell>
      <TableCell className="text-center">
        {washing.notify && <CheckIcon size={20} />}
      </TableCell>
      <TableCell>
        {washing.emailSentAt ? (
          <span className="text-green-500">Enviado</span>
        ) : (
          <span className="text-gray-500">No enviado</span>
        )}
      </TableCell>
      <TableCell>
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
            ✖
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
            ⏳
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
            ✔
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};
