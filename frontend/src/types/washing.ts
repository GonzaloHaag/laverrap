import type { Database } from "./database";
export type Washing = Database["public"]["Tables"]["washed"]["Row"] & {
  clients: Database["public"]["Tables"]["clients"]["Row"];
  services: Database["public"]["Tables"]["services"]["Row"];
};
export type NewWashing = Database["public"]["Tables"]["washed"]["Insert"];
