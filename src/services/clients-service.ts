
import { ClientSchema } from "@/schemas";
import { supabaseClient } from "@/supabase/supabase-client";
import type { ApiResponse } from "@/types/api-response";
import type { Client, NewClient } from "@/types/client";
import { safeParse } from "valibot";

export const getAllClients = async ({
  userId,
  filters,
}: {
  userId: string;
  filters: {
    searchValue: string;
    statusValue: string;
  };
}): Promise<ApiResponse<Client[]>> => {
  const query = supabaseClient
    .from("clients")
    .select("*")
    .eq("user_id", userId);
  if (filters.searchValue.trim() !== "") {
    query.or(
      `name.ilike.%${filters.searchValue}%, email.ilike.%${filters.searchValue}%, patent.ilike.%${filters.searchValue}%`
    );
  }
  if (filters.statusValue !== "") {
    query.eq("status", filters.statusValue as "active" | "inactive");
  }
  const { data, error } = await query;

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }

  return {
    ok: true,
    message: "Exito al obtener los clientes",
    data: data,
  };
};


export const createClient = async ({
  client,
}: {
  client: NewClient;
}): Promise<ApiResponse<Client>> => {
  try {
    const result = safeParse(ClientSchema, client);
    if (!result.success) {
      return {
        ok: false,
        message: "Datos inválidos",
      };
    }

    const { data, error } = await supabaseClient
      .from("clients")
      .insert(client)
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        message: error.message || "Error al crear el cliente",
      };
    }

    return {
      ok: true,
      message: "Cliente creado",
      data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error inesperado",
    };
  }
};