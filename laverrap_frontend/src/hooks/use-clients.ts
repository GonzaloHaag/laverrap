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
    clients: data,
    mutate,
  };
};
