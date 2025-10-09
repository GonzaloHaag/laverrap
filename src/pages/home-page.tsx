import {
  SectionCardsHome,
  MonthlyRevenueChart,
  WashTypesChart,
} from "@/components/home";
import { Separator } from "@/components/ui/separator";
import { CalendarIcon } from "lucide-react";

export function HomePage() {
  return (
    <section className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2">
        <CalendarIcon size={20} className="text-muted-foreground" />
        <h1 className="text-xl font-medium">Estadisticas del día</h1>
      </div>
      <SectionCardsHome />
      <Separator />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MonthlyRevenueChart />
        <WashTypesChart />
      </div>
    </section>
  );
}
