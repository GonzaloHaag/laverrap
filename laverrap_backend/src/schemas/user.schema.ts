import z from "zod";
export const userSchema = z.object({
  id: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.email(),
  username: z.string().max(100).nullable(),
  role: z.enum(["USER", "ADMIN"]),
}).required();

export type UserType = z.infer<typeof userSchema>; 