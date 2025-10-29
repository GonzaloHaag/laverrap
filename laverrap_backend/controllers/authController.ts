import type { Request, Response } from "express";
import { z } from "zod";
import { validateUser } from "../schemas/UserSchema.ts";
import { supabase } from "../lib/supabase.ts";

const loginUser = async (req: Request, res: Response) => {
  const result = validateUser(req.body);
  if (!result.success) {
    return res.status(400).json({
      ok: false,
      message: "Error al validar los datos",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }
  const {
    data: { session },
    error,
  } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  });

  if (error) {
    console.log(error);
    if (error.code === "invalid_credentials") {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas",
      });
    }
    return res.status(500).json({
      ok: false,
      message: "Error al iniciar sesión",
    });
  }

  return res.status(200).json({
     ok:true,
     message:"Inicio de sesion exitoso",
     token: session.access_token
  });
};

export default {
  loginUser,
};
