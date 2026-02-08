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
    washed: data?.washed,
    totalToday: data?.totalToday,
    totalCompleted: data?.totalCompleted,
    totalInProgress: data?.totalInProgress,
    totalPending: data?.totalPending,
    mutate,
  };
};
