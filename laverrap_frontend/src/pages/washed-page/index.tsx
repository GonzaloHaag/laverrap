import { useState } from "react";
import {
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { PlusCircleIcon } from "lucide-react";
import { FormWashing, SectionCards, TableWashed } from "./components";
import { useWashed } from "@/hooks";

export const WashedPage = () => {
  const { isLoading, error, washed } = useWashed();
  const [open, setOpen] = useState(false);
  const closeDialog = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de lavados</CardTitle>
        <CardDescription>Administra los lavados de tu lavadero</CardDescription>
        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button" title="Nuevo lavado">
                <PlusCircleIcon />
                Nuevo lavado
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nuevo lavado</DialogTitle>
                <DialogDescription>
                  Colocá los detalles del nuevo lavado
                </DialogDescription>
              </DialogHeader>
              {/* <FormService service={null} closeDialog={closeDialog} /> */}
              <FormWashing washing={null} closeDialog={closeDialog} />
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <SectionCards />
        <div className="flex items-center justify-between">
          {/* <ServiceFilters /> */}
        </div>
        <TableWashed
          isLoading={isLoading}
          error={error}
          washed={washed || []}
        />
      </CardContent>
    </Card>
  );
};
