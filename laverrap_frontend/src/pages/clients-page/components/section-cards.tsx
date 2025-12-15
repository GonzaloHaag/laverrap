import { CardPage } from "@/components/shared";
import { DollarSignIcon, StarIcon } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardPage title="Total clientes" value={200} Icon={StarIcon} />
      <CardPage title="Total clientes" value={200} Icon={StarIcon} />
      <CardPage title="Nuevos(mes)" value={25} Icon={DollarSignIcon} />
      <CardPage title="Activos" value={150} Icon={DollarSignIcon} />
    </section>
  );
};
