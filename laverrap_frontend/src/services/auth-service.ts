import type { LoginType } from "@/schemas/login-schema";
import { api } from "./api";
import type { User } from "@/schemas";

interface LoginResponse {
  ok: boolean;
  message: string;
  token?: string;
  user?: User
}
export const authService = {
  login: async ({ email, password }: LoginType): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });
    return data;
  },

  getCurrentUser: async () => {
    const { data } = await api.get("/auth/me");

    console.log(data);
    return data;
  },
};
