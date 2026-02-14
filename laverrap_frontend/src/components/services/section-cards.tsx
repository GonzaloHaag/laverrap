import { CardPage } from "@/components/shared";
import { DollarSignIcon, PlusIcon, TrendingUpIcon } from "lucide-react";
interface Props {
  isLoading: boolean;
  totalServices: number;
  averagePrice: number;
}
export const SectionCards = ({ totalServices, averagePrice, isLoading }: Props) => {
  return (
    <section className="container-cards">
      <CardPage title="Total servicios" value={totalServices} Icon={PlusIcon} isLoading={isLoading} />
      <CardPage
        title="Más Popular"
        value="Lavado completo"
        Icon={TrendingUpIcon}
        isLoading={isLoading}
      />
      <CardPage title="Precio Promedio" value={averagePrice} Icon={DollarSignIcon} isMoney isLoading={isLoading} />
      <CardPage
        title="Ingresos Total"
        value="$1,250.00"
        Icon={DollarSignIcon}
        isLoading={isLoading}
      />
    </section>
  );
};
