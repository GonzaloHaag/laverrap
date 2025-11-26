import type { Client } from "@/schemas";
import type { ServiceResponse } from "@/types";
import { api } from "./api";

export const clientService = {
  getAll: async (): Promise<Client[]> => {
    const { data } = await api.get<ServiceResponse<Client[]>>("/clients");
    return data.data;
  },
};
