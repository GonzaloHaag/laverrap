import { Card } from "@/components/ui";
import { DollarSignIcon, PlusIcon, TrendingUpIcon } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Total Servicios
            </p>
            <p className="text-2xl font-bold text-foreground">
              50
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <PlusIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Más Popular</p>
            <p className="text-sm font-bold text-foreground">
              Lavado completo
            </p>
            <p className="text-xs text-muted-foreground">
              10 usos
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
            <TrendingUpIcon className="h-6 w-6 text-chart-3" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Precio Promedio
            </p>
            <p className="text-2xl font-bold text-foreground">
              $25.00
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <DollarSignIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Ingresos Total</p>
            <p className="text-2xl font-bold text-foreground">
              $1,250.00
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
            <DollarSignIcon className="h-6 w-6 text-chart-3" />
          </div>
        </div>
      </Card>
    </section>
  );
};
