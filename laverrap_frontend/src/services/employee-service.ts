import type { Employee } from "@/schemas";
import { api } from "./api";
import type { ServiceResponse } from "@/types";
const EMPLOYEES_URL = "/employees";
export const employeeService = {
  getAll: async (): Promise<{ employees: Employee[]; total: number; totalActive: number; totalInactive: number }> => {
    const { data } = await api.get<ServiceResponse<{ employees: Employee[]; total: number; totalActive: number; totalInactive: number }>>(EMPLOYEES_URL);
    return data.data;
  },
  create: async ({
    employee,
  }: {
    employee: Partial<Employee>;
  }): Promise<Employee> => {
    const { data } = await api.post<ServiceResponse<Employee>>(
      EMPLOYEES_URL,
      employee
    );
    return data.data;
  },
  update: async ({
    id,
    employee,
  }: {
    id: Employee["id"];
    employee: Partial<Employee>;
  }): Promise<Employee> => {
    const { data } = await api.put<ServiceResponse<Employee>>(
      `${EMPLOYEES_URL}/${id}`,
      employee
    );
    return data.data;
  },

  updateStatus: async ({ id }: { id: Employee["id"] }) => {
    const { data } = await api.patch<ServiceResponse<Employee>>(
      `${EMPLOYEES_URL}/${id}`
    );
    return data.data;
  },
};
