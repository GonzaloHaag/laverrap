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
import { FormClient, SectionCards, TableClients } from "./components";
import { useClients } from "@/hooks";

export const ClientsPage = () => {
  const {
    isLoading,
    error,
    clients,
    total,
    totalActive,
    totalInactive,
    totalNewsMonth,
  } = useClients();
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de clientes</CardTitle>
        <CardDescription>
          Administra los clientes de tu lavadero
        </CardDescription>
        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button" title="Agregar cliente">
                <PlusCircleIcon />
                Agregar cliente
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nuevo cliente</DialogTitle>
                <DialogDescription>
                  Colocá los detalles del nuevo cliente
                </DialogDescription>
              </DialogHeader>
              <FormClient client={null} closeDialog={closeDialog} />
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <SectionCards
          isLoading={isLoading}
          total={total ?? 0}
          totalActive={totalActive ?? 0}
          totalInactive={totalInactive ?? 0}
          totalNewsMonth={totalNewsMonth ?? 0}
        />
        <div className="flex items-center justify-between">
          {/* <ServiceFilters /> */}
        </div>
        <TableClients
          isLoading={isLoading}
          clients={clients ?? []}
          error={error}
        />
      </CardContent>
    </Card>
  );
};
