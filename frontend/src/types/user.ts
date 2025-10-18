import type { InferInput } from "valibot";
import type { LoginSchema } from "@/schemas/login-schema";

export type UserLogin = InferInput<typeof LoginSchema>;