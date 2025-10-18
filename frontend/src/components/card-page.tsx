import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { formatMoney } from "@/lib/utils";
import type { CardOption } from "@/types/card";
interface CardPageProps {
    card: CardOption;
}
export const CardPage = ({ card }: CardPageProps) => {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{card.title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {card.type === "currency" ? formatMoney(Number(card.description)) : card.description}
        </CardTitle>
        <CardAction>
          <card.Icon size={24} />
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="text-muted-foreground">
          {card.text}
        </div>
      </CardFooter>
    </Card>
  );
};
