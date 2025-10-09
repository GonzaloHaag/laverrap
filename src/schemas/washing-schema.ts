import { nonEmpty, number, object, picklist, pipe, string, } from "valibot";

export const WashingSchema = object({
    user_id: pipe(string(), nonEmpty("El usuario es obligatorio")),
    client_id: number("El cliente es obligatorio"),
    service_id: number("El servicio es obligatorio"),
    status: picklist(["in_progress", "completed", "cancelled"])
})