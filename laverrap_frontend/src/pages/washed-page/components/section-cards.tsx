import { Card } from "@/components/ui";
import {
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
} from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Total hoy</p>
            <p className="text-2xl font-bold text-foreground">50</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <CalendarIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Completados</p>
            <p className="text-2xl font-bold text-foreground">20</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <CheckCircleIcon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">En proceso</p>
            <p className="text-2xl font-bold text-foreground">10</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <ClockIcon className="h-6 w-6 text-yellow-500" />
          </div>
        </div>
      </Card>

      <Card className="p-4 border-border">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Pendientes</p>
            <p className="text-2xl font-bold text-foreground">20</p>
          </div>
          <div className="h-12 w-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
            <CheckIcon className="h-6 w-6 text-chart-3" />
          </div>
        </div>
      </Card>
    </section>
  );
};
