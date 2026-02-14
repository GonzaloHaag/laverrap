import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../utils/config";
import { ClientError } from "../utils/errors";
export const authService = {
  login: async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) throw new ClientError("Credenciales inválidas", 401);
    /** Una vez que encontro email, validar password */
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new ClientError("Credenciales inválidas", 401);

    /** Crear token, devuelve un string */
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      config.SECRET_KEY!,
      {
        expiresIn: "2h",
      }
    );

    const { password: _, ...publicUser } = user;
    return { user: publicUser, token };
  },
};
