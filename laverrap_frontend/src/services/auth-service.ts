import type { LoginType } from "@/schemas/login-schema";
import { api } from "./api";

interface LoginResponse {
    ok:boolean;
    message:string;
    token?:string;
}
export const authService = {
    login: async({ email, password } : LoginType ):Promise<LoginResponse> => {
        const { data } = await api.post<LoginResponse>("/auth/login", { email, password });
        return data;
    }
};