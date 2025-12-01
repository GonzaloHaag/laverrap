import { employeeService } from "@/services";
import useSWR from "swr";
export const useEmployees = () => {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    "/employees",
    employeeService.getAll
  );

  return {
    isLoading,
    isValidating,
    error,
    employees: data,
    mutate,
  };
};
