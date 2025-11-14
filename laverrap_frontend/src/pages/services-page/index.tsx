import {
  Button,
  Card,
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
import { SectionCards, ServiceFilters, ServiceForm } from "./components";
import { PlusCircleIcon } from "lucide-react";

export const ServicesPage = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gestión de servicios</CardTitle>
        <CardDescription>
          Administra los servicios de tu lavadero
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <SectionCards />
        <div className="flex items-center justify-between">
          <ServiceFilters />
          <Dialog>
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
              <ServiceForm />
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};
