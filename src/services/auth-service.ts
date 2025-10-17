import { LoginSchema } from "@/schemas/login-schema";
import { supabaseClient } from "@/supabase/supabase-client";
import type { ApiResponse } from "@/types/api-response";
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
    if (error) {
      return {
        ok: false,
        message:
          error.code === "invalid_credentials"
            ? "Credenciales inválidas"
            : "Error al iniciar sesión",
      };
    }
    return {
      ok: true,
      message: "Login exitoso!",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Ocurrió un error inesperado",
    };
  }
};

export const loginWithGoogle = async () => {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    }
  });

  if (error) {
    return {
      ok: false,
      message: error.message || "Error al iniciar sesión con Google",
    };
  }

  return {
    ok:true,
    message:"Login exitoso con Google"
  }
};

export const logoutUser = async (): Promise<ApiResponse<null>> => {
  try {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      return {
        ok: false,
        message: error.message || "Error al cerrar sesión",
      };
    }
    return {
      ok: true,
      message: "Sesión cerrada",
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Ocurrió un error inesperado",
    };
  }
};
