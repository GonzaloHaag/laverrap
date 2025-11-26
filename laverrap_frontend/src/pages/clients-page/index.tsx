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
import { SectionCards, TableClients } from "./components";
import { useClients } from "@/hooks";

export const ClientsPage = () => {
  const { clients, isLoading, error } = useClients();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de clientes</CardTitle>
        <CardDescription>
          Administra los clientes de tu lavadero
        </CardDescription>
        <CardAction>
          <Dialog>
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
              {/* <FormService service={null} closeDialog={closeDialog} /> */}
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <SectionCards />
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
