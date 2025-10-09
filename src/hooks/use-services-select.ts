import { getServicesForSelect } from "@/services/services-service";
import type { Service } from "@/types/service";
import { useQuery } from "@tanstack/react-query";

interface Options {
  userId: string;
}
export const useServicesSelect = ({ userId }: Options) => {
  const servicesQuerySelect = useQuery<
    Pick<Service, "id" | "name" | "price">[]
  >({
    queryKey: ["services-select", userId],
    queryFn: async () => {
      const response = await getServicesForSelect({ userId: userId });
      if (!response.ok || !response.data) {
        throw new Error(response.message);
      }
      return response.data;
    },
    staleTime: 1000 * 60 * 60 * 4, // 4 horas
    enabled: !!userId,
  });

  return {
    servicesQuerySelect,
  };
};
