import { Card } from "@/components/ui";
import { DollarSignIcon, PlusIcon  } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Total Empleados
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
            <p className="text-sm text-muted-foreground mb-1">
              Activos
            </p>
            <p className="text-2xl font-bold text-foreground">
              5
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
            <p className="text-sm text-muted-foreground mb-1">
              Empleado con más lavados
            </p>
            <p className="text-2xl font-bold text-foreground">
              Juan Pérez
            </p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <DollarSignIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>
    </section>
  );
};
