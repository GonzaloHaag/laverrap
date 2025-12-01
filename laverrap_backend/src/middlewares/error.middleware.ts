import { NextFunction, Request, Response } from "express";

const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    ok: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
