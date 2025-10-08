import { getAllServices } from "@/services/services-service";
import type { Service } from "@/types/service";
import { useQuery } from "@tanstack/react-query";

interface Options {
  userId: string;
  filters: {
    searchValue: string;
    categoryValue: string;
    statusValue: string;
  }
}
export const useServices = ({
  userId,
  filters
}: Options) => {
  const servicesQuery = useQuery<Service[]>({
    queryKey: ["services", userId, filters.searchValue, filters.categoryValue, filters.statusValue],
    queryFn: async () => {
      const response = await getAllServices({
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
    servicesQuery,
  };
};
