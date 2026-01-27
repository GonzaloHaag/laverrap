import { CardPage } from "@/components/shared";
import { DollarSignIcon, PlusIcon, TrendingUpIcon } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="container-cards">
      <CardPage title="Total servicios" value={40} Icon={PlusIcon} />
      <CardPage
        title="Más Popular"
        value="Lavado completo"
        Icon={TrendingUpIcon}
      />
      <CardPage title="Precio Promedio" value="$25.00" Icon={DollarSignIcon} />
      <CardPage
        title="Ingresos Total"
        value="$1,250.00"
        Icon={DollarSignIcon}
      />
    </section>
  );
};
