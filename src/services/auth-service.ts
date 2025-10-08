import { LoginSchema } from "@/schemas/login-schema";
import { supabaseClient } from "@/supabase/supabase-client";
import type { UserLogin } from "@/types/user";
import { safeParse } from "valibot";

export const loginUser = async (data: UserLogin) => {
  try {
    const result = safeParse(LoginSchema, data);
    if (!result.success) {
      return {
        ok: false,
        message: "Datos inválidos",
      };
    }
    // si paso, quiere decir que el result fue success
    const parsedData = result.output;
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: parsedData.email,
      password: parsedData.password,
    });
    if(error) {
        return {
            ok:false,
            message: error.code === "invalid_credentials" ? "Crdenciales inválidas" : "Error al iniciar sesión"
        }
    }
    return {
        ok:true,
        message:"Login exitoso!"
    }
  } catch (error) {
    console.error(error);
    return {
        ok:false,
        message:"Ocurrió un error inesperado"
    }
  }
};
