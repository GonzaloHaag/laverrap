import { NextFunction, Request, Response } from "express";
import jwt  from "jsonwebtoken";
import config from "../utils/config";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  console.log("Token auth", token);
  if (!token) {
    return res.status(401).json({ message: "No se envio el token" });
  }
  req.user = null;

  /** Verificar token */
  try {
    const data = jwt.verify(token, config.SECRET_KEY);
    req.user = data; // se inserta el user en cada request
  } catch (error) {
    console.error("Error verifying token:", error);
    if(error instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({ message: "Token invalido" });
    }
    if(error instanceof jwt.TokenExpiredError) {
        return res.status(403).json({ message: "Token expirado" });
    }
    return res.status(500).json({ message: "Error interno del servidor" });
  }

  next();
};

export default authMiddleware;
