import z from "zod";
export const washingStatus = z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"]);
export const washingSchema = z.object({
    status: washingStatus.default("PENDING"),
    serviceId: z.number().int().positive(),
    employeeId: z.number().int().positive(),
    clientId: z.number().int().positive(),
    details: z.string().max(500).nullable(),
    notify: z.boolean().default(true),
    emailSentAt: z.date().nullable().default(null),
});

export type Washing = z.infer<typeof washingSchema>; 
export type WashingStatus = z.infer<typeof washingStatus>;