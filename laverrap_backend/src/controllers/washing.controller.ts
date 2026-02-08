import { Request, Response } from "express";
import { washingService } from "../services/washing.service";
import { responseSuccess } from "../utils/response-success";
import {
  Washing,
  washingSchema,
  washingStatus,
} from "../schemas/washing.schema";
import { WashingResponse } from "../types/api/washing.response";

export const washingController = {
  getAll: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const {
      washed,
      totalToday,
      totalCompleted,
      totalInProgress,
      totalPending,
    } = await washingService.getAllWashed(userId!);
    responseSuccess<WashingResponse>(res, 200, {
      washed,
      totalToday,
      totalCompleted,
      totalInProgress,
      totalPending,
    });
  },

  create: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const validatedFields = washingSchema.parse(req.body);
    const washingCreated = await washingService.createWashing(
      userId!,
      validatedFields,
    );
    responseSuccess<Washing>(res, 201, washingCreated);
  },

  updateStatusById: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const washingId = Number(req.params.id);
    const { status } = req.body;
    const validatedStatus = washingStatus.parse(status);
    const updatedWashing = await washingService.changeStatusWashing(
      userId!,
      washingId,
      validatedStatus,
    );
    responseSuccess<Washing>(res, 200, updatedWashing);
  },

  deleteById: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const washingId = Number(req.params.id);
    await washingService.deleteWashing(washingId, userId!);
    responseSuccess<null>(res, 204, null);
  },
};
