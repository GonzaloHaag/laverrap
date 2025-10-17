import { Pagination, Search, SelectFilter } from "@/components";
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
import { FormWashing, TableWashes } from "@/components/washes";
import { useAuth, useModal, usePagination, useWashes } from "@/hooks";
import { WASHING_STATES } from "@/lib/consts";
import { PlusIcon } from "lucide-react";
import { useSearchParams } from "react-router";
export function WashesPage() {
  const { isOpen, toggleModal } = useModal();
  const { session } = useAuth();
  const [searchParams] = useSearchParams();
  const filters = {
    searchValue: searchParams.get("search")?.toString() ?? "",
    statusValue: searchParams.get("status")?.toString() ?? "",
  };
  const { page, goToPage, goToNextPage, goToPreviousPage } = usePagination();
  const { washesQuery } = useWashes({
    userId: session!.user.id,
    filters,
    page,
  });
  return (
    <section className="flex flex-col gap-y-4">
      {/* <SectionCardsServices /> */}
      <Card>
        <CardHeader>
          <CardTitle>LAVADOS</CardTitle>
          <CardDescription>
            Aqui puedes administrar los lavados de tu lavadero
          </CardDescription>
          <CardAction>
            <Dialog open={isOpen} onOpenChange={toggleModal}>
              <DialogTrigger asChild>
                <Button
                  type="button"
                  title="Agregar lavado"
                  className="min-w-32"
                >
                  <PlusIcon />
                  Agregar lavado
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                  <DialogTitle>Nuevo lavado</DialogTitle>
                  <DialogDescription>
                    Colocá los detalles del lavado
                  </DialogDescription>
                </DialogHeader>
                <FormWashing
                  userId={session!.user.id}
                  toggleModal={toggleModal}
                />
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-4">
          <form className="flex items-center gap-x-4 w-full">
            <Search placeholder="Buscar por nombre del cliente o patente..." />
            <SelectFilter
              options={WASHING_STATES}
              urlSet="status"
              placeholder="Estado"
            />
          </form>
          <TableWashes
            washes={washesQuery.data?.data || []}
            isLoading={washesQuery.isLoading}
            isError={washesQuery.isError}
          />
          <Pagination
            goToPage={goToPage}
            currentPage={page}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            totalPages={washesQuery.data?.totalPages || 0}
          />
        </CardContent>
      </Card>
    </section>
  );
}
