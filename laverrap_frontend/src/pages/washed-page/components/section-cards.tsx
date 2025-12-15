import { CardPage } from "@/components/shared";
import {
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
} from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CardPage title="Total hoy" value={50} Icon={CalendarIcon} />
      <CardPage title="Completados" value={20} Icon={CheckCircleIcon} />
      <CardPage title="En proceso" value={10} Icon={ClockIcon} />
      <CardPage title="Pendientes" value={20} Icon={CheckIcon} />
    </section>
  );
};
