import z from "zod";

export const WashingSchema = z.object ({
    client_id: z.number().positive("El ID del cliente debe ser un número positivo"),
    service_id: z.number().positive("El ID del servicio debe ser un número positivo"),
    status: z.enum(["in_progress","completed","cancelled"], "Estado inválido").default("in_progress"),
    notified_client: z.boolean().default(false)
}).required();

export const validateWashing = (data: unknown) => {
    return WashingSchema.safeParse(data);
};