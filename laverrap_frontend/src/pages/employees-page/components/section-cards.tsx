import { CardPage } from "@/components/shared";
import { DollarSignIcon, PlusIcon  } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardPage title="Total Empleados" value={50} Icon={PlusIcon} />
      <CardPage title="Activos" value={5} Icon={PlusIcon} />
      <CardPage title="Empleado con más lavados" value="Juan Pérez" Icon={DollarSignIcon} />
    </section>
  );
};
