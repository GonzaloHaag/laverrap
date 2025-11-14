import { number, object, string } from "yup";

export const serviceSchema = object({
  name: string().required("El nombre del servicio es obligatorio"),
  price: number()
    .required("El precio del servicio es obligatorio")
    .min(0, "El precio no puede ser negativo"),
  duration: number()
    .required("La duración del servicio es obligatoria")
    .min(1, "La duración debe ser al menos 1 minuto"),
  category: string()
    .oneOf(["basic", "complete", "premium", "other"], "Categoría inválida")
    .required("La categoría del servicio es obligatoria")
    .default("basic"),
  status: string()
    .oneOf(["active", "inactive"], "Estado inválido")
    .required("El estado del servicio es obligatorio")
    .default("active"),
  description: string()
    .max(500, "La descripción no puede exceder los 500 caracteres")
    .defined()
    .nullable(),
}).required();
