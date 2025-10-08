import { getAllClients } from "@/services/clients-service";
import type { Client } from "@/types/client";
import { useQuery } from "@tanstack/react-query";

interface Options {
  userId: string;
  filters: {
    searchValue: string;
    statusValue: string;
  }
}
export const useClients = ({
  userId,
  filters
}: Options) => {
  const clientsQuery = useQuery<Client[]>({
    queryKey: ["clients", userId, filters.searchValue, filters.statusValue],
    queryFn: async () => {
      const response = await getAllClients({
        userId: userId,
        filters
      });
      if (!response.ok || !response.data) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 4, // 4 horas
    enabled: !!userId,
  });

  return {
    clientsQuery
  };
};
