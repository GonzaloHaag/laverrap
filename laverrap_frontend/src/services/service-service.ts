import type { Service } from "@/schemas";
import { api } from "./api";
import type { ServiceResponse } from "@/types";
const SERVICES_URL = "/services";
export const serviceService = {
  getAll: async (): Promise<{ services: Service[]; total: number, averagePrice: number | null }> => {
    const { data } = await api.get<ServiceResponse<{ services: Service[]; total: number, averagePrice: number | null }>>(SERVICES_URL);
    return data.data;
  },

  create: async ({
    service,
  }: {
    service: Omit<Service, "id">;
  }): Promise<Service> => {
    const { data } = await api.post<ServiceResponse<Service>>(
      SERVICES_URL,
      service
    );
    return data.data;
  },

  update: async ({
    id,
    service,
  }: {
    id: Service["id"];
    service: Partial<Omit<Service, "id">>;
  }): Promise<Service> => {
    const { data } = await api.put<ServiceResponse<Service>>(
      `${SERVICES_URL}/${id}`,
      service
    );
    return data.data;
  },

  delete: async ({ id }: { id: Service["id"] }): Promise<void> => {
    await api.delete(`${SERVICES_URL}/${id}`);
  },
};
