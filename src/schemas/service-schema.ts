import { object, string, pipe, nonEmpty, trim, number, picklist } from "valibot";
export const ServiceSchema = object({
  user_id: pipe(string(), nonEmpty("El usuario es obligatorio")),
  name: pipe(string(), trim(), nonEmpty("El nombre es obligatorio")),
  description: pipe(string(), trim(), nonEmpty("La descripción es obligatoria")),
  category: picklist(["basic","complete","premium",'other']),
  status: picklist(["active","inactive"]),
  price: number("El precio es requerido"),
  duration: number("La duración es requerida")
});
