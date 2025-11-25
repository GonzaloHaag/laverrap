import z from "zod";

export const serviceSchema = z.object({
    name: z.string("El nombre del servicio es requerido").min(1, "El nombre del servicio es requerido").max(100, "El nombre del servicio no puede exceder los 100 caracteres"),
    description: z.string().max(500, "La descripcion no puede exceder los 500 caracteres").nullable(),
    price: z.number("El precio es requerido").min(0, "El precio no puede ser negativo"),
    duration: z.coerce.number("La duracion en minutos es requerida").min(1, "La duracion debe ser al menos de 1 minuto"),
    category: z.enum(["BASIC", "COMPLETE", "PREMIUM"], "La categoria es requerida"),
    userId: z.number("El ID del usuario es requerido").int().positive("El ID del usuario debe ser un numero entero positivo"),
}).required();