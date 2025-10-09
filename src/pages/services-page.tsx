import { Pagination, Search, SelectFilter } from "@/components";
import { FormService, TableServices } from "@/components/services";
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
import { useAuth, useModal, useServices } from "@/hooks";
import { SERVICES_CATEGORIES, STATES } from "@/lib/consts";
import { PlusIcon } from "lucide-react";
import { useSearchParams } from "react-router";
export function ServicesPage() {
  const { isOpen, toggleModal } = useModal();
  const { session } = useAuth();
  const [searchParams] = useSearchParams();
  const filters = {
    searchValue: searchParams.get("search")?.toString() ?? "",
    categoryValue: searchParams.get("category")?.toString() ?? "",
    statusValue: searchParams.get("status")?.toString() ?? "",
  };
  const { servicesQuery } = useServices({
    userId: session!.user.id,
    filters,
  });

  return (
    <section className="flex flex-col gap-y-4">
      {/* <SectionCardsServices /> */}
      <Card>
        <CardHeader>
          <CardTitle>SERVICIOS</CardTitle>
          <CardDescription>
            Aquí puedes administrar los servicios que ofrece tu lavadero
          </CardDescription>
          <CardAction>
            <Dialog open={isOpen} onOpenChange={toggleModal}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  title="Agregar servicio"
                  className="min-w-32"
                >
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
                <FormService
                  userId={session!.user.id}
                  toggleModal={toggleModal}
                  service={null}
                />
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <form className="flex items-center gap-x-4 w-full">
            <Search placeholder="Buscar por nombre..." />
            <SelectFilter
              options={SERVICES_CATEGORIES}
              urlSet="category"
              placeholder="Categoría"
            />
            <SelectFilter
              options={STATES}
              urlSet="status"
              placeholder="Estado"
            />
          </form>
          <TableServices
            services={servicesQuery.data || []}
            isLoading={servicesQuery.isLoading}
            isError={servicesQuery.isError}
            userId={session!.user.id}
          />
          <Pagination />
        </CardContent>
      </Card>
    </section>
  );
}
