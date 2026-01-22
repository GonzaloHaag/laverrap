import z from "zod";

export const clientSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre del cliente es requerido")
    .max(100, "El nombre del cliente no puede exceder los 100 caracteres"),
  email: z.email("El correo electrónico no es válido"),
  car_type: z
    .enum(
      ["CAR", "PICKUP", "MOTORCYCLE", "OTHER"],
      "El tipo de vehículo es requerido"
    )
    .default("CAR"),
  car_model: z
    .string("El modelo del vehículo es requerido")
    .min(1, "El modelo del vehículo es requerido")
    .max(100, "El modelo del vehículo no puede exceder los 100 caracteres"),
  car_plate: z
    .string("La patente del vehículo es requerida")
    .min(1, "La patente del vehículo es requerida")
    .max(20, "La patente del vehículo no puede exceder los 20 caracteres"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type Client = z.infer<typeof clientSchema>;
