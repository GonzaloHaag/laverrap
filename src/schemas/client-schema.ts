import {
  email,
  nonEmpty,
  nullable,
  object,
  optional,
  picklist,
  pipe,
  string,
} from "valibot";

export const ClientSchema = object({
  name: pipe(string(), nonEmpty("El nombre es obligatorio")),
  email: pipe(
    string(),
    nonEmpty("El email es obligatorio"),
    email("El email no es válido")
  ),
  phone: nullable(string()),
  description: nullable(string()),
  user_id: optional(string()),
  status: picklist(["active", "inactive"]),
  vehicle_type: picklist(
    ["car", "pickup", "motorcycle", "other"],
    "El tipo de vehículo es obligatorio"
  ),
  model_brand: nullable(string()),
  patent: pipe(string(), nonEmpty("La patente es obligatoria")),
});
