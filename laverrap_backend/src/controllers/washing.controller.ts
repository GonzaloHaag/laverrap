import { Request, Response } from "express";
import { washingService } from "../services/washing.service";
import { responseSuccess } from "../utils/response-success";
import { Washing, washingSchema } from "../schemas/washing.schema";

export const washingController = {
  getAll: async (req: Request, res: Response) => {
    // Lógica para obtener todos los lavados
    const userId = req.user?.id;
    const washed = await washingService.getAllWashed(userId!);
    responseSuccess<Washing[]>(res, 200, washed);
  },

  create: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const validatedFields = washingSchema.parse(req.body);
    const washingCreated = await washingService.createWashing(
      userId!,
      validatedFields
    );
    responseSuccess<Washing>(res, 201, washingCreated);
  },
};
