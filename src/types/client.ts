import type { Database } from "./database";

export type Client = Database["public"]["Tables"]["clients"]["Row"];
export type ClientWithWashes = Client & {
    washed: { count: number }[];
}
export type NewClient = Database["public"]["Tables"]["clients"]["Insert"];