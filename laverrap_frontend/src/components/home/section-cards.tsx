import { CardPage } from "@/components/shared";
import { CarIcon, DollarSignIcon, Users2Icon } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="container-cards">
      <CardPage title="Ingresos del mes" value={245000} Icon={DollarSignIcon} isLoading={false} isMoney />
      <CardPage title="Lavados totales" value={342} Icon={CarIcon} isLoading={false} />
      <CardPage title="Clientes activos" value={25} Icon={Users2Icon} isLoading={false} />
      <CardPage title="Activos" value={150} Icon={DollarSignIcon} isLoading={false} />
    </section>
  );
};
