import { Response } from "express";

export const responseSuccess = <T>(
  res: Response,
  statusCode: number,
  data: T | null
) => {
  res.status(statusCode).json({
    ok: true,
    data: data,
  });
};
