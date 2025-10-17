import { getAllWashes } from "@/services/washes-service";
import type { ApiResponse } from "@/types/api-response";
import type { Washing } from "@/types/washing";
import { useQuery } from "@tanstack/react-query";

interface Options {
  userId: string;
  filters: {
    searchValue: string;
    statusValue: string;
  };
  page:number;
}
export const useWashes = ({ userId, filters, page }: Options) => {
  const washesQuery = useQuery<ApiResponse<Washing[]>>({
    queryKey: ["washes", userId, filters.searchValue, filters.statusValue],
    queryFn: async () => {
      const response = await getAllWashes({
        userId: userId,
        filters,
        page
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
    washesQuery,
  };
};
