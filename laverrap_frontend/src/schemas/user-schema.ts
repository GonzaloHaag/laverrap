import { number, object, string, type InferType } from "yup";

export const userSchema = object({
    id: number().integer().required(),
    createdAt: string(),
    updatedAt: string(),
    email: string().email().required(),
    username: string(),
    role: string().oneOf(["USER", "ADMIN"]).required(),
}).required();

export type User = InferType<typeof userSchema>;