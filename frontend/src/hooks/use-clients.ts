import { getAllClients } from "@/services/clients-service";
import type { ApiResponse } from "@/types/api-response";
import type { ClientWithWashes } from "@/types/client";
import { useQuery } from "@tanstack/react-query";

interface Options {
  userId: string;
  filters: {
    searchValue: string;
    statusValue: string;
  };
  page: number;
}
export const useClients = ({ userId, filters, page }: Options) => {
  const clientsQuery = useQuery<ApiResponse<ClientWithWashes[]>>({
    queryKey: ["clients", userId, filters.searchValue, filters.statusValue, page],
    queryFn: async () => {
      const response = await getAllClients({
        userId: userId,
        filters,
        page,
      });
      if (!response.ok || !response.data) {
        throw new Error(response.message);
      }
      return response;
    },
    staleTime: 1000 * 60 * 60 * 4, // 4 horas
    enabled: !!userId,
  });

  return {
    clientsQuery,
  };
};
