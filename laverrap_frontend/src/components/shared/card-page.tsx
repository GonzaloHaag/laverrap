import type { LucideIcon } from "lucide-react";
import { Card } from "../ui";
import { formatMoney } from "@/utils/formatters";

interface Props {
  title: string;
  value: number | string;
  Icon: LucideIcon;
  isMoney?: boolean;
  isLoading: boolean;
}
export const CardPage = ({
  title,
  value,
  Icon,
  isMoney = false,
  isLoading,
}: Props) => {
  return (
    <Card className="p-4 border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          {isLoading ? (
            <div className="h-8 w-20 bg-muted rounded-md animate-pulse" />
          ) : (
            <p className="text-2xl font-bold text-foreground">
              {isMoney ? `${formatMoney(value as number)}` : value}
            </p>
          )}
        </div>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};
