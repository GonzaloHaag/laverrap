import { CardPage } from "@/components/shared";
import { DollarSignIcon, PlusIcon, TrendingUpIcon } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
