import type { LucideIcon } from "lucide-react";

export type CardOption = {
  id: number;
  title: string;
  description: string | number;
  Icon: LucideIcon;
  type: "integer" | "currency";
  text: string;
};
