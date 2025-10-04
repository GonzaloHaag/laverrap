import { object, string, pipe, nonEmpty, nullable, trim, number, picklist, transform } from "valibot";
export const ServiceSchema = object({
  name: pipe(string(), trim(), nonEmpty("El nombre es obligatorio")),
  description: nullable(string()), // string | null
  category: picklist(["basic","complete","premium"]),
  status: picklist(["active","inactive"]),
  price: pipe(
    string(),
    trim(),
    nonEmpty("El precio es obligatorio"),
    transform(Number),
    number("El precio debe ser un número")
  ),
  duration: pipe(
    string(),
    trim(),
    nonEmpty("La duración es obligatoria"),
    transform(Number),
    number("La duración debe ser un número")
  ),
});
