import { CardPage } from "@/components/shared";
import { DollarSignIcon, StarIcon } from "lucide-react";
interface Props {
  isLoading: boolean;
  total: number;
  totalActive: number;
  totalInactive: number;
  totalNewsMonth: number;
}
export const SectionCards = ({
  isLoading,
  total,
  totalActive,
  totalInactive,
  totalNewsMonth,
}: Props) => {
  return (
    <section className="container-cards">
      <CardPage
        title="Total clientes"
        value={total}
        Icon={StarIcon}
        isLoading={isLoading}
      />
      <CardPage
        title="Total clientes activos"
        value={totalActive}
        Icon={StarIcon}
        isLoading={isLoading}
      />
      <CardPage
        title="Total clientes inactivos"
        value={totalInactive}
        Icon={StarIcon}
        isLoading={isLoading}
      />
      <CardPage
        title="Nuevos(mes)"
        value={totalNewsMonth}
        Icon={DollarSignIcon}
        isLoading={isLoading}
      />
    </section>
  );
};
