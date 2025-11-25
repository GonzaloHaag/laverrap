import { Button, DialogClose, DialogFooter } from "../ui";
interface DialogFooterFormProps {
  title: string;
  isLoading: boolean;
}
export const DialogFooterForm = ({
  title,
  isLoading,
}: DialogFooterFormProps) => {
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button type="button" title="Cancelar" variant={"outline"} className="min-w-28">
          Cancelar
        </Button>
      </DialogClose>
      <Button type="submit" title={title} variant={"default"} className="min-w-28" disabled={isLoading}>
        { title }
      </Button>
    </DialogFooter>
  );
};
