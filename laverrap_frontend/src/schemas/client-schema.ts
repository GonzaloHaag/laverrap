import { object, string, type InferType } from "yup";

export const ClientSchema = object({
  name: string()
    .required("El nombre es requerido")
    .max(100, "El nombre no puede tener más de 100 caracteres"),
  email: string()
    .email("El correo no es válido")
    .required("El correo es requerido")
    .max(100, "El correo no puede tener más de 100 caracteres"),
  phone: string()
    .required("El teléfono es requerido")
    .max(15, "El teléfono no puede tener más de 15 caracteres"),
  car_type: string()
    .oneOf(
      ["CAR", "PICKUP", "MOTORCYCLE", "OTHER"],
      "Tipo de vehículo no válido"
    )
    .required("El tipo de vehículo es requerido"),
  car_model: string()
    .required("El modelo del vehículo es requerido")
    .max(50, "El modelo no puede tener más de 50 caracteres"),
  car_plate: string()
    .required("La placa del vehículo es requerida")
    .max(10, "La placa no puede tener más de 10 caracteres"),
  status: string()
    .oneOf(["ACTIVE", "INACTIVE"], "Estado no válido")
    .required("El estado es requerido")
    .default("ACTIVE"),
}).required();

export type Client = InferType<typeof ClientSchema> & {
  id: number;
 _count: { washed: number }
};
