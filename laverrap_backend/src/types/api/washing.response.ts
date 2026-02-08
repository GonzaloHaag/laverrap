import { Washing } from "../../schemas/washing.schema";

export interface WashingResponse {
    washed: Washing[];
    totalToday: number;
    totalCompleted: number;
    totalInProgress: number;
    totalPending: number;
}