import { CardPage } from "@/components/shared";
import { DollarSignIcon, PlusIcon  } from "lucide-react";
interface Props {
  isLoading: boolean;
  total: number;
  totalActive: number;
  totalInactive: number;
}
export const SectionCards = ({ isLoading, total, totalActive, totalInactive }: Props) => {
  return (
    <section className="container-cards">
      <CardPage title="Total Empleados" value={total} Icon={PlusIcon} isLoading={isLoading}  />
      <CardPage title="Empleados Activos" value={totalActive} Icon={PlusIcon} isLoading={isLoading} />
       <CardPage title="Empleados Inactivos" value={totalInactive} Icon={PlusIcon} isLoading={isLoading} />
      <CardPage title="Empleado con más lavados" value="Juan Pérez" Icon={DollarSignIcon} isLoading={isLoading} />
    </section>
  );
};
