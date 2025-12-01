import { object, string, type InferType } from "yup";

export const employeeSchema = object({
  name: string().required("El nombre es requerido"),
  phone: string().defined().nullable().default(null),
  entry_time: string().required("La hora de entrada es requerida"),
  departure_time: string().required("La hora de salida es requerida"),
  status: string().oneOf(["ACTIVE", "INACTIVE"]).default("ACTIVE"),
});
export type Employee = InferType<typeof employeeSchema> & { id: number; _count:{ washed: number } };
