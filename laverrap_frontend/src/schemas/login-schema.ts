import { object, string, type InferType } from "yup";

export const loginSchema = object({
    email: string().email("Formato de correo electrónico no válido").required("Email es requerido"),
    password: string().min(6, "La contraseña debe tener al menos 6 caracteres").required("Contraseña es requerida"),
}).required();

export type LoginType = InferType<typeof loginSchema>;