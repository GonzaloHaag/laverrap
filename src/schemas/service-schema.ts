import { object, string, pipe, nonEmpty, trim, number, picklist, optional } from "valibot";
export const ServiceSchema = object({
  user_id: optional(string()),
  name: pipe(string(), trim(), nonEmpty("El nombre es obligatorio")),
  description: pipe(string(), trim(), nonEmpty("La descripción es obligatoria")),
  category: picklist(["basic","complete","premium"]),
  status: picklist(["active","inactive"]),
  price: number("El precio es requerido"),
  duration: number("La duración es requerida")
});
