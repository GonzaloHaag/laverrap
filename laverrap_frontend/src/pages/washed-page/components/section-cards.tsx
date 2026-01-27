import { CardPage } from "@/components/shared";
import {
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
} from "lucide-react";

export const SectionCards = () => {
  return (
    <section className="container-cards">
      <CardPage title="Total hoy" value={50} Icon={CalendarIcon} />
      <CardPage title="Completados" value={20} Icon={CheckCircleIcon} />
      <CardPage title="En proceso" value={10} Icon={ClockIcon} />
      <CardPage title="Pendientes" value={20} Icon={CheckIcon} />
    </section>
  );
};
