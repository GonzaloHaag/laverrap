import { clientService } from "@/services";
import useSWR from "swr";

export const useClients = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/clients",
    clientService.getAll
  );

  return {
    isLoading,
    isValidating,
    error,
    clients: data?.clients,
    total: data?.total,
    totalActive: data?.totalActive,
    totalInactive: data?.totalInactive,
    totalNewsMonth: data?.totalNewsMonth,
    mutate,
  };
};
