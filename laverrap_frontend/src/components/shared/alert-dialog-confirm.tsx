import { useState } from "react";
import { Button } from "../ui";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

interface Props {
  onClickConfirm: () => Promise<void>;
  isRestore: boolean;
}

export const AlertDialogConfirm = ({ onClickConfirm, isRestore }: Props) => {
  const [openAlertDialogConfirm, setOpenAlertDialogConfirm] = useState(false);
  return (
    <AlertDialog
      open={openAlertDialogConfirm}
      onOpenChange={setOpenAlertDialogConfirm}
    >
      <AlertDialogTrigger asChild>
        <Button variant={"link"} size={"sm"} className={`${isRestore ? "text-green-600" : "text-red-600"} p-0 ml-2`}>
          {isRestore ? "Restaurar" : "Eliminar"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          {/* <AlertDialogDescription>
            Esta acción no se puede deshacer.
          </AlertDialogDescription> */}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="min-w-24">Cancel</AlertDialogCancel>
          <AlertDialogAction className={`min-w-24 ${isRestore ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`} onClick={onClickConfirm}>
            {isRestore ? "Restaurar" : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
