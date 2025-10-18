import {
  nonEmpty,
  nullable,
  object,
  picklist,
  pipe,
  string,
} from "valibot";

export const ClientSchema = object({
  user_id: string(),
  name: pipe(string(), nonEmpty("El nombre es obligatorio")),
  phone: nullable(string()),
  description: nullable(string()),
  status: picklist(["active", "inactive"]),
  vehicle_type: picklist(
    ["car", "pickup", "motorcycle", "other"],
    "El tipo de vehículo es obligatorio"
  ),
  model_brand: nullable(string()),
  patent: pipe(string(), nonEmpty("La patente es obligatoria")),
});
