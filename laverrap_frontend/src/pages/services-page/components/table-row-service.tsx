import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCategoryService, formatMoney } from "@/utils/formatters";
import { ClockIcon } from "lucide-react";
import { FormService } from "./form-service";
import type { Service } from "@/schemas";
import { serviceService } from "@/services";
import { useServices } from "@/hooks";
import { toast } from "sonner";
import { AlertDialogConfirm } from "@/components/shared";


interface Props {
  service: Service;
}
export const TableRowService = ({ service }: Props) => {
  const [open, setOpen] = useState(false);
  const { mutate } = useServices();

  const closeDialog = () => {
    setOpen((prev) => !prev);
  };

  const onClickConfirmDelete = async () => {
      await serviceService.delete({ id: service.id });
      mutate();
      toast.success("Servicio eliminado con éxito");
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{service.name}</TableCell>
      <TableCell>{service.description}</TableCell>
      <TableCell>{formatCategoryService(service.category)}</TableCell>
      <TableCell>
        <div className="flex items-center gap-x-0">
          <ClockIcon size={16} className="text-gray-400" />
          <span className="ml-1">{service.duration} min</span>
        </div>
      </TableCell>
      <TableCell className="font-medium">
        {formatMoney(service.price)}
      </TableCell>
      <TableCell>
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
                Modificá los detalles del servicio seleccionado
              </DialogDescription>
            </DialogHeader>
            <FormService service={service} closeDialog={closeDialog} />
          </DialogContent>
        </Dialog>
        <AlertDialogConfirm onClickConfirm={onClickConfirmDelete} isRestore={false} />
      </TableCell>
    </TableRow>
  );
};
