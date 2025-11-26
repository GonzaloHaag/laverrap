import type { Service } from "@/schemas";
import { api } from "./api";
import type { ServiceResponse } from "@/types";
export const serviceService = {
  getAll: async (): Promise<Service[]> => {
    const { data } = await api.get<ServiceResponse<Service[]>>("/services");
    return data.data;
  },

  create: async ({
    service,
  }: {
    service: Omit<Service, "id">;
  }): Promise<Service> => {
    const { data } = await api.post<ServiceResponse<Service>>(
      "/services",
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
      `/services/${id}`,
      service
    );
    return data.data;
  },

  delete: async ({ id }: { id: Service["id"] }): Promise<void> => {
    await api.delete(`/services/${id}`);
  },
};
