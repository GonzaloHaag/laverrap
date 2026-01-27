import { CardPage } from "@/components/shared";
import { DollarSignIcon, StarIcon } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="container-cards">
      <CardPage title="Total clientes activos" value={200} Icon={StarIcon} />
      <CardPage title="Total clientes inactivos" value={200} Icon={StarIcon} />
      <CardPage title="Nuevos(mes)" value={25} Icon={DollarSignIcon} />
      <CardPage title="Activos" value={150} Icon={DollarSignIcon} />
    </section>
  );
};
