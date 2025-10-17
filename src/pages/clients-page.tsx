import { Pagination, Search, SelectFilter } from "@/components";
import { FormClient, TableClients } from "@/components/clients";
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
import { useAuth, useClients, useModal, usePagination } from "@/hooks";
import { STATES } from "@/lib/consts";
import { PlusIcon } from "lucide-react";
import { useSearchParams } from "react-router";
export function ClientsPage() {
  const { isOpen, toggleModal } = useModal();
  const { session } = useAuth();
  const [searchParams] = useSearchParams();
  const filters = {
    searchValue: searchParams.get("search")?.toString() ?? "",
    statusValue: searchParams.get("status")?.toString() ?? "",
  };
  const { page, goToPage, goToNextPage, goToPreviousPage } = usePagination();
  const { clientsQuery } = useClients({
    userId: session!.user.id,
    filters,
    page: page,
  });
  return (
    <section className="flex flex-col gap-y-4">
      {/* <SectionCardsServices /> */}
      <Card>
        <CardHeader>
          <CardTitle>CLIENTES</CardTitle>
          <CardDescription>
            Aqui puedes administrar los clientes de tu lavadero
          </CardDescription>
          <CardAction>
            <Dialog open={isOpen} onOpenChange={toggleModal}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  title="Agregar cliente"
                  className="min-w-32"
                >
                  <PlusIcon />
                  Agregar cliente
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nuevo cliente</DialogTitle>
                  <DialogDescription>
                    Colocá los detalles del cliente
                  </DialogDescription>
                </DialogHeader>
                <FormClient
                  userId={session!.user.id}
                  toggleModal={toggleModal}
                  client={null}
                />
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <form className="flex items-center gap-x-4 w-full">
            <Search placeholder="Buscar por nombre o patente..." />
            <SelectFilter
              options={STATES}
              urlSet="status"
              placeholder="Estado"
            />
          </form>
          <TableClients
            clients={clientsQuery.data?.data || []}
            isLoading={clientsQuery.isLoading}
            isError={clientsQuery.isError}
            userId={session!.user.id}
          />
          <Pagination
            goToPage={goToPage}
            currentPage={page}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            totalPages={clientsQuery.data?.totalPages || 0}
          />
        </CardContent>
      </Card>
    </section>
  );
}
