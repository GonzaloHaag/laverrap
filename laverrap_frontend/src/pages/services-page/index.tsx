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
import {
  FormService,
  SectionCards,
  ServiceFilters,
  TableServices,
} from "./components";
import { PlusCircleIcon } from "lucide-react";
import { useServices } from "@/hooks";

export const ServicesPage = () => {
  const { services, total, averagePrice, isLoading, error } = useServices();
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de servicios</CardTitle>
        <CardDescription>
          Administra los servicios de tu lavadero
        </CardDescription>
        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button type="button" title="Agregar servicio">
                <PlusCircleIcon />
                Agregar servicio
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nuevo servicio</DialogTitle>
                <DialogDescription>
                  Colocá los detalles del nuevo servicio que ofrecerás
                </DialogDescription>
              </DialogHeader>
              <FormService service={null} closeDialog={closeDialog} />
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <SectionCards
          isLoading={isLoading}
          totalServices={total ?? 0}
          averagePrice={averagePrice ?? 0}
        />
        <div className="flex items-center justify-between">
          <ServiceFilters />
        </div>
        <TableServices
          isLoading={isLoading}
          error={error}
          services={services ?? []}
        />
      </CardContent>
    </Card>
  );
};
