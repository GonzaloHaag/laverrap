import type { LucideIcon } from "lucide-react";
import { Card } from "../ui";

interface Props {
    title:string;
    value: number | string;
    Icon: LucideIcon;
}
export const CardPage = ({ title, value, Icon } : Props) => {
  return (
    <Card className="p-4 border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </Card>
  );
};
