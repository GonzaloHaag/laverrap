import { CardPage } from "@/components/shared";
import { DollarSignIcon, PlusIcon  } from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="container-cards">
      <CardPage title="Total Empleados" value={50} Icon={PlusIcon} />
      <CardPage title="Empleados Activos" value={5} Icon={PlusIcon} />
       <CardPage title="Empleados Inactivos" value={5} Icon={PlusIcon} />
      <CardPage title="Empleado con más lavados" value="Juan Pérez" Icon={DollarSignIcon} />
    </section>
  );
};
