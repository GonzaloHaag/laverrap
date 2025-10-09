import type { CardOption } from "@/types/card";
import { CarIcon, DollarSignIcon, UsersIcon } from "lucide-react";
import { CardPage } from "../card-page";

export const SectionCardsHome = () => {

    // Realizar llamada al backend para obtener datos reales
  const cardsHome: CardOption[] = [
    {
      id: 1,
      title: "Ingresos",
      description: 200000,
      Icon: DollarSignIcon,
      type: "currency",
      text: "Total de ingresos",
    },
    {
      id: 2,
      title: "Lavados completados",
      description: 8,
      Icon: CarIcon,
      type: "integer",
      text: "Total de lavados completados",
    },
    {
      id: 3,
      title: "Clientes atendidos",
      description: 4,
      Icon: UsersIcon,
      type: "integer",
      text: "Total de clientes atendidos",
    },
    {
      id: 4,
      title: "Ticket promedio",
      description: 25000,
      Icon: DollarSignIcon,
      type: "currency",
      text: "Total de ingresos por servicio",
    },
  ];
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {cardsHome.map((card) => (
        <CardPage key={card.id} card={card} />
      ))}
    </section>
  );
};
