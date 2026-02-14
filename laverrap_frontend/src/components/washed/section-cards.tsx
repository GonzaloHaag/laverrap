import { CardPage } from "@/components/shared";
import {
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
} from "lucide-react";

interface Props {
  isLoading: boolean;
  totalToday: number;
  totalCompleted: number;
  totalInProgress: number;
  totalPending: number;
}

export const SectionCards = ({ isLoading, totalToday, totalCompleted, totalInProgress, totalPending } : Props) => {
  return (
    <section className="container-cards">
      <CardPage title="Totales hoy" value={totalToday} Icon={CalendarIcon} isLoading={isLoading} />
      <CardPage title="Completados" value={totalCompleted} Icon={CheckCircleIcon} isLoading={isLoading} />
      <CardPage title="En proceso" value={totalInProgress} Icon={ClockIcon} isLoading={isLoading} />
      <CardPage title="Pendientes" value={totalPending} Icon={CheckIcon} isLoading={isLoading} />
    </section>
  );
};
