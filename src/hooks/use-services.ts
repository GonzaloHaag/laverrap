import { getAllServices } from "@/services/services-service";
import type { ApiResponse } from "@/types/api-response";
import type { Service } from "@/types/service";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

interface Options {
  userId: string;
  filters: {
    searchValue: string;
    categoryValue: string;
    statusValue: string;
  };
  page: number;
}
export const useServices = ({ userId, filters, page }: Options) => {
  const servicesQuery = useQuery<ApiResponse<Service[]>>({
    queryKey: [
      "services",
      userId,
      filters.searchValue,
      filters.categoryValue,
      filters.statusValue,
      page,
    ],
    queryFn: async () => {
      const response = await getAllServices({
        userId: userId,
        filters,
        page,
      });
      if (!response.ok || !response.data) {
        throw new Error(response.message);
      }
      return response;
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 60 * 4, // 4 horas
    enabled: !!userId,
  });

  return {
    servicesQuery,
  };
};
