import { LoaderCircleIcon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { useDeleteWashingMutation } from "@/hooks/mutations";
interface ButtonDeleteWashingProps {
  washingId: number;
}
export const ButtonDeleteWashing = ({
  washingId,
}: ButtonDeleteWashingProps) => {
  const deleteWashingMutation = useDeleteWashingMutation();
  const onClickOnlyDeleteWashing = () => {
    deleteWashingMutation.mutate(washingId);
  };
  return (
    <Button
      type="button"
      variant={"outline"}
      size={"icon-sm"}
      title="Borrar"
      onClick={onClickOnlyDeleteWashing}
      disabled={deleteWashingMutation.isPending}
    >
      {deleteWashingMutation.isPending ? (
        <LoaderCircleIcon className="animate-spin" />
      ) : (
        <Trash2Icon className="text-red-600" />
      )}
    </Button>
  );
};
