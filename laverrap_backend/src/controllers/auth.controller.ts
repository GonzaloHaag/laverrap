import { Request, Response } from "express";
import { loginSchema } from "../schemas/login.schema";
import { authService } from "../services/auth.service";
export const authController = {
  login: async (req: Request, res: Response) => {
    const result = loginSchema.parse(
      req.body
    ); /** Arroja error si el cuerpo no cumple con el esquema */
    const response = await authService.login(result.email, result.password);
    return res.status(200).json({
      ok: true,
      message: "Login exitoso",
      user: response.user,
      token: response.token,
    });
  },
};
