
import { ServiceSchema } from "@/schemas";
import { supabaseClient } from "@/supabase/supabase-client";
import type { ApiResponse } from "@/types/api-response";
import type { NewService, Service } from "@/types/service";
import { safeParse } from "valibot";

export const getAllServices = async ({
  userId,
  filters
}: {
  userId: string;
  filters: {
    searchValue: string;
    categoryValue: string;
    statusValue: string;
  }
}): Promise<ApiResponse<Service[]>> => {
  const query = supabaseClient
    .from("services")
    .select("*")
    .eq("user_id", userId);
  if (filters.searchValue.trim() !== "") {
    query.ilike("name", `%${filters.searchValue}%`);
  }
  if (filters.categoryValue !== "") {
    query.eq("category", filters.categoryValue as "basic" | "complete" | "premium");
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
    message: "Exito al obtener servicios",
    data: data,
  };
};

export const createService = async ({
  service,
}: {
  service: NewService;
}): Promise<ApiResponse<Service>> => {
  try {
    const result = safeParse(ServiceSchema, service);
    if (!result.success) {
      return {
        ok: false,
        message: "Datos inválidos",
      };
    }

    const { data, error } = await supabaseClient
      .from("services")
      .insert(service)
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        message: error.message || "Error al crear el servicio",
      };
    }

    return {
      ok: true,
      message: "Servicio creado",
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
