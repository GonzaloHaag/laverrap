import { washingService } from "@/services";
import useSWR from "swr";
export const useWashed = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/washed",
    washingService.getAll
  );

  return {
    isLoading,
    isValidating,
    error,
    washed: data,
    mutate,
  };
};
