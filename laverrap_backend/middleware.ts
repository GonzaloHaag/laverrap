import type { NextFunction, Request, Response } from "express";
import { supabase } from "./lib/supabase.ts";

export const protectedRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization.split(" ")[1]; // Extract token from "Bearer <token>"
  if (!authorization) {
    return res.status(401).json({
      ok: false,
      message: "No se proporcionó el token de autorización",
    });
  }

  /** Verificar token con supabase */
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(authorization);

  if (error || !user) {
    return res.status(401).json({
      ok: false,
      message: "Token de autorización inválido",
    });
  }

  req.user = user; // Incrustar en la request el usuario autenticado para las demas rutas
  next();
};
