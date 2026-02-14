import { CardPage } from "@/components/shared";
import { CarIcon, DollarSignIcon, Users2Icon } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="container-cards">
      <CardPage title="Ingresos del mes" value={245000} Icon={DollarSignIcon} isMoney />
      <CardPage title="Lavados totales" value={342} Icon={CarIcon} />
      <CardPage title="Clientes activos" value={25} Icon={Users2Icon} />
      <CardPage title="Activos" value={150} Icon={DollarSignIcon} />
    </section>
  );
};
