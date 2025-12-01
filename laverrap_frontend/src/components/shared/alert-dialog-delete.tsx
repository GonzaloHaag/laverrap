import { useState } from "react";
import { Button } from "../ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
  onClickDelete: () => Promise<void>;
}

export const AlertDialogDelete = ({ onClickDelete }: Props) => {
  const [openAlertDialogDelete, setOpenAlertDialogDelete] = useState(false);
  return (
    <AlertDialog
      open={openAlertDialogDelete}
      onOpenChange={setOpenAlertDialogDelete}
    >
      <AlertDialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className="text-red-600 p-0 ml-2">
          Eliminar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="min-w-24">Cancel</AlertDialogCancel>
          <AlertDialogAction className="min-w-24" onClick={onClickDelete}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
