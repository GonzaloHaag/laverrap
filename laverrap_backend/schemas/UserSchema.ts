import z from "zod";
export const UserSchema = z.object({
  email: z.email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
}).required();

export const validateUser = (data: unknown) => {
  return UserSchema.safeParse(data);
};
