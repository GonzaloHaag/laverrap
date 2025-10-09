import { getAllWashes } from "@/services/washes-service";
import type { Washing } from "@/types/washing";
import { useQuery } from "@tanstack/react-query";

interface Options {
  userId: string;
  filters: {
    searchValue: string;
    statusValue: string;
  };
}
export const useWashes = ({ userId, filters }: Options) => {
  const washesQuery = useQuery<Washing[]>({
    queryKey: ["washes", userId, filters.searchValue, filters.statusValue],
    queryFn: async () => {
      const response = await getAllWashes({
        userId: userId,
        filters,
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
    washesQuery,
  };
};
