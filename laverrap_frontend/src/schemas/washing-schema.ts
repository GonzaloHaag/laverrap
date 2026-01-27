import { boolean, number, object, string, type InferType } from "yup";
import type { Client } from "./client-schema";
import type { Employee } from "./employee-schema";
import type { Service } from "./service-schema";
export const washingSchema = object({
  status: string()
    .oneOf(["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"])
    .required(),
  serviceId: number().integer().required("El servicio es obligatorio"),
  employeeId: number().integer().required("El empleado es obligatorio"),
  clientId: number().integer().required("El cliente es obligatorio"),
  details: string().max(500).nullable(),
  notify: boolean()
    .transform((value, originalValue) => {
      if (typeof originalValue === "string") {
        return originalValue === "true";
      }
      return value;
    })
    .required()
    .default(true),
});

export type Washing = InferType<typeof washingSchema> & { 
    id:number;
    client: Client;
    employee: Employee;
    service: Service;
    emailSentAt: Date | null;
};
