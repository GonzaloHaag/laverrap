import type { Database } from "./database";

export type Service = Database["public"]["Tables"]["services"]["Row"];
export type NewService = Database["public"]["Tables"]["services"]["Insert"];