import z from "zod";

export const washingSchema = z.object({
    status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]).default("PENDING"),
    serviceId: z.number().int().positive(),
    employeeId: z.number().int().positive(),
    clientId: z.number().int().positive(),
    details: z.string().max(500).nullable(),
    notify: z.boolean().default(true),
});

export type Washing = z.infer<typeof washingSchema>; 