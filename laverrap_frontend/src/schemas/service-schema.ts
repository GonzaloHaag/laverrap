import { number, object, string, type InferType } from "yup";

export const serviceSchema = object({
  name: string().required("El nombre del servicio es obligatorio"),
  price: number()
    .required("El precio del servicio es obligatorio")
    .min(0, "El precio no puede ser negativo"),
  duration: number()
    .required("La duración del servicio es obligatoria")
    .min(1, "La duración debe ser al menos 1 minuto"),
  category: string()
    .oneOf(["BASIC", "COMPLETE", "PREMIUM", "OTHER"], "Categoría inválida")
    .required("La categoría del servicio es obligatoria")
    .default("BASIC"),
  description: string()
    .max(500, "La descripción no puede exceder los 500 caracteres")
    .defined()
    .nullable(),
  status: string()
    .oneOf(["ACTIVE", "INACTIVE"], "Estado inválido")
    .required("El estado del servicio es obligatorio")
    .default("ACTIVE"),
}).required();

export type Service = InferType<typeof serviceSchema> & { id: number };
