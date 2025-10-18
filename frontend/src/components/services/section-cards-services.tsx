import type { CardOption } from "@/types/card";
import { CogIcon } from "lucide-react";
import { CardPage } from "../card-page";

export const SectionCardsServices = () => {
  const cardsServices: CardOption[] = [
    {
      id: 1,
      title: "Servicios",
      description: 12,
      Icon: CogIcon,
      type: "integer",
      text: "Total de servicios",
    },
    {
      id: 2,
      title: "Servicios activos",
      description: 8,
      Icon: CogIcon,
      type: "integer",
      text: "Total de servicios activos",
    },
    {
      id: 3,
      title: "Servicios inactivos",
      description: 4,
      Icon: CogIcon,
      type: "integer",
      text: "Total de servicios inactivos",
    },
    {
      id: 4,
      title: "Ingresos por servicios",
      description: 123456,
      Icon: CogIcon,
      type: "currency",
      text: "Total de ingresos por servicios",
    },
  ];
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cardsServices.map((card) => (
        <CardPage key={card.id} card={card} />
      ))}
    </section>
  );
};
