import { serviceService } from "@/services";
import useSWR from "swr";
export const useServices = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/services",
    serviceService.getAll
  );

  return {
    isLoading,
    isValidating,
    error,
    services: data,
    mutate,
  };
};
