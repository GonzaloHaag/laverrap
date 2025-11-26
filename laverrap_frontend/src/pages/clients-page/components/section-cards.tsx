import { Card } from "@/components/ui";
import { DollarSignIcon, PlusIcon, StarIcon } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total clientes</p>
            <p className="text-2xl font-bold text-foreground">200</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <StarIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total clientes</p>
            <p className="text-2xl font-bold text-foreground">200</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <PlusIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Nuevos(mes)</p>
            <p className="text-2xl font-bold text-foreground">25</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <DollarSignIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Activos</p>
            <p className="text-2xl font-bold text-foreground">150</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
            <DollarSignIcon className="h-6 w-6 text-chart-3" />
          </div>
        </div>
      </Card>
    </section>
  );
};
