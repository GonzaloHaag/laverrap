import { washingSchema, type Washing } from "@/schemas";
import { api } from "./api";
import type { ServiceResponse, WashingStatus } from "@/types";
const WASHED_URL = "/washed";
export const washingService = {
  getAll: async (): Promise<{
    washed: Washing[];
    totalToday: number;
    totalCompleted: number;
    totalInProgress: number;
    totalPending: number;
  }> => {
    const { data } =
      await api.get<
        ServiceResponse<{
          washed: Washing[];
          totalToday: number;
          totalCompleted: number;
          totalInProgress: number;
          totalPending: number;
        }>
      >(WASHED_URL);
    return data.data;
  },

  create: async ({ washing }: { washing: unknown }): Promise<Washing> => {
    const validatedFields = await washingSchema.validate(washing, {
      strict: true,
    });
    const { data } = await api.post<ServiceResponse<Washing>>(
      WASHED_URL,
      validatedFields,
    );
    return data.data;
  },

  updateStatus: async ({
    id,
    status,
  }: {
    id: Washing["id"];
    status: WashingStatus;
  }) => {
    const { data } = await api.patch<ServiceResponse<Washing>>(
      `${WASHED_URL}/${id}`,
      { status },
    );
    return data.data;
  },
  delete: async ({ id }: { id: Washing["id"] }): Promise<void> => {
    await api.delete(`${WASHED_URL}/${id}`);
  },
};
