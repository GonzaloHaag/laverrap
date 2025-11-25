import type { Service } from "@/schemas";
import { api } from "./api";
import type { ServiceResponse } from "@/types";
export const serviceService = {
  getAll: async (): Promise<Service[]> => {
    const { data } = await api.get<ServiceResponse<Service[]>>("/services");
    return data.data;
  },
};
