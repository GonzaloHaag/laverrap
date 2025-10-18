import { getClientsForSelect } from "@/services/clients-service";
import type { Client } from "@/types/client";
import { useQuery } from "@tanstack/react-query";

interface Options {
  userId: string;
}
export const useClientsSelect = ({
  userId,
}: Options) => {
  const clientsQuerySelect= useQuery<Pick<Client, "id" | "name" | "model_brand" | "patent">[]>({
    queryKey: ["clients-select", userId],
    queryFn: async () => {
      const response = await getClientsForSelect({ userId: userId });
      if (!response.ok || !response.data) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 4, // 4 horas
    enabled: !!userId,
  });

  return {
    clientsQuerySelect
  };
};
