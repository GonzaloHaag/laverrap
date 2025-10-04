import { Search, SelectFilter } from "@/components";
import { FormService } from "@/components/services";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SERVICES_CATEGORIES, STATES } from "@/lib/consts";
import { PlusIcon } from "lucide-react";
export function ServicesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>SERVICIOS</CardTitle>
        <CardDescription>
          Aquí puedes administrar los servicios que ofrece tu lavadero
        </CardDescription>
        <CardAction>
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button" title="Agregar servicio">
                <PlusIcon />
                Agregar servicio
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Nuevo servicio</DialogTitle>
                <DialogDescription>
                  Colocá los detalles que ofrecera el servicio.
                </DialogDescription>
              </DialogHeader>
              <FormService />
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form className="flex items-center gap-x-4 w-full">
          <Search placeholder="Buscar por nombre..." />
          <SelectFilter
            options={SERVICES_CATEGORIES}
            urlSet="category"
            placeholder="Categoría"
          />
          <SelectFilter options={STATES} urlSet="status" placeholder="Estado" />
        </form>
      </CardContent>
    </Card>
  );
}
