import z from "zod";

export const ClientSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  phone: z.string().min(1, "El teléfono es obligatorio"),
  description: z.string().nullable().optional(),
  status: z.enum(["active", "inactive"], "Estado inválido").default("active"),
  vehicle_type: z.enum(
    ["car", "pickup", "motorcycle", "other"],
    "Tipo de vehículo inválido"
  ),
  model_brand: z.string().min(1, "El modelo/marca es obligatorio"),
  patent: z.string().min(1, "La patente es obligatoria"),
}).required();

export const validateClient = (data: unknown) => {
  return ClientSchema.safeParse(data);
};

export const validatePartialClient = (data: unknown) => {
  return ClientSchema.partial().safeParse(data);
};
