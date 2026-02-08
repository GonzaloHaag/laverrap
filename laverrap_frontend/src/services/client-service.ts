import type { Client } from "@/schemas";
import type { ServiceResponse } from "@/types";
import { api } from "./api";
const CLIENTS_URL = "/clients";
export const clientService = {
  getAll: async (): Promise<{
    clients: Client[];
    total: number;
    totalActive: number;
    totalInactive: number;
    totalNewsMonth: number;
  }> => {
    const { data } =
      await api.get<
        ServiceResponse<{
          clients: Client[];
          total: number;
          totalActive: number;
          totalInactive: number;
          totalNewsMonth: number;
        }>
      >(CLIENTS_URL);
    return data.data;
  },

  create: async ({ client }: { client: Partial<Client> }): Promise<Client> => {
    const { data } = await api.post<ServiceResponse<Client>>(
      CLIENTS_URL,
      client,
    );
    return data.data;
  },

  update: async ({
    id,
    client,
  }: {
    id: Client["id"];
    client: Partial<Client>;
  }): Promise<Client> => {
    const { data } = await api.put<ServiceResponse<Client>>(
      `${CLIENTS_URL}/${id}`,
      client,
    );
    return data.data;
  },

  updateStatus: async ({ id }: { id: Client["id"] }): Promise<Client> => {
    const { data } = await api.patch<ServiceResponse<Client>>(
      `${CLIENTS_URL}/${id}`,
    );
    return data.data;
  },
};
