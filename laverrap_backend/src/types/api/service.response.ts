import { Service } from "../../schemas/service.schema";

export interface ServiceResponse {
    services: Service[];
    total: number;
    averagePrice: number | null;
}