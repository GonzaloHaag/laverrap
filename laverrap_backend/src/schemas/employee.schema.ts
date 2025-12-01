import z from "zod";

export const employeeSchema = z.object({
  name: z
    .string("El nombre del empleado es requerido")
    .min(1, "El nombre del empleado es requerido")
    .max(100, "El nombre del empleado no puede exceder los 100 caracteres"),
  phone: z.string().optional(),
  entry_time: z
    .string("La hora de entrada es requerida")
    .min(1, "La hora de entrada es requerida"),
  departure_time: z
    .string("La hora de salida es requerida")
    .min(1, "La hora de salida es requerida"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});

export type Employee = z.infer<typeof employeeSchema>;