import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { loginSchema } from "../schemas/login.schema";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config";
export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const result = loginSchema.parse(
        req.body
      ); /** Arroja error si el cuerpo no cumple con el esquema */
      console.log(result);
      const user = await prisma.user.findUnique({
        where: { email: result.email },
      });
      if (!user) {
        return res.status(401).json({
          ok: false,
          message: "Credenciales inválidas",
        });
      }
      /** Una vez que encontro email, validar password */
      const isValidPassword =  await bcrypt.compare(result.password, user.password);

      if(!isValidPassword) {
        return res.status(401).json({
          ok: false,
          message: "Credenciales inválidas",
        });
      }

      /** Crear token, devuelve un string */
      const token = jwt.sign({
         id: user.id,
         email:user.email,
         username: user.username,

      }, config.SECRET_KEY, {
          expiresIn: "2h",
      });

      const { password: _, ...publicUser } = user;
      return res.status(200).json({
        ok: true,
        message: "Login exitoso",
        user: publicUser,
        token: token
      });
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          ok: false,
          message: "Error de validación",
          errors: error.issues,
        });
      }
      return res.status(500).json({
        ok: false,
        message: "Error en el servidor",
      });
    }
  },
};
