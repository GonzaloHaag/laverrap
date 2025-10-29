import z from "zod";

export const ServiceSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre del servicio debe tener al menos 3 caracteres"),
  price: z.number("El precio es requerido").positive("El precio debe ser un número positivo"),
  duration: z
    .number()
    .positive("La duración debe ser un número positivo en minutos"),
  category: z.enum(
    ["basic", "complete", "premium", "other"],
    "Categoría inválida"
  ),
  status: z.enum(["active", "inactive"], "Estado inválido").default("active"),
  description: z.string().nullable().optional(),
}).required();

export const validateService = (data: unknown) => {
  return ServiceSchema.safeParse(data);
};

export const validatePartialService = (data: unknown) => {
  return ServiceSchema.partial().safeParse(data);
};
