import { ServiceSchema } from "@/schemas";
import { supabaseClient } from "@/supabase/supabase-client";
import type { ApiResponse } from "@/types/api-response";
import type { NewService, Service } from "@/types/service";
import { safeParse } from "valibot";

export const getAllServices = async ({
  userId,
  filters,
}: {
  userId: string;
  filters: {
    searchValue: string;
    categoryValue: string;
    statusValue: string;
  };
}): Promise<ApiResponse<Service[]>> => {
  const query = supabaseClient
    .from("services")
    .select("*")
    .order("name", { ascending: true })
    .eq("user_id", userId);
  // TODO: add pagination
  if (filters.searchValue.trim() !== "") {
    query.ilike("name", `%${filters.searchValue}%`);
  }
  if (filters.categoryValue !== "") {
    query.eq(
      "category",
      filters.categoryValue as "basic" | "complete" | "premium"
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
    message: "Exito al obtener servicios",
    data: data,
  };
};

export const createOrUpdateService = async ({
  service,
  serviceId,
}: {
  service: NewService;
  serviceId: number | null;
}): Promise<ApiResponse<Service>> => {
  try {
    const result = safeParse(ServiceSchema, service);
    if (!result.success) {
      return {
        ok: false,
        message: "Datos inválidos",
      };
    }

    let query;
    if (serviceId) {
      query = supabaseClient
        .from("services")
        .update(service)
        .eq("id", serviceId)
        .select()
        .single();
    } else {
      query = supabaseClient.from("services").insert(service).select().single();
    }
    const { data, error } = await query;

    if (error) {
      return {
        ok: false,
        message: error.message || "Error al crear o editar el servicio",
      };
    }

    return {
      ok: true,
      message: serviceId ? "Servicio actualizado" : "Servicio creado",
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

export const getServicesForSelect = async ({
  userId,
}: {
  userId: string;
}): Promise<ApiResponse<Pick<Service, "id" | "name" | "price">[]>> => {
  try {
    const { data, error } = await supabaseClient
      .from("services")
      .select("id, name, price")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("name", { ascending: true });

    if (error) {
      return {
        ok: false,
        message:
          error.message || "Error al obtener los nombres de los servicios",
      };
    }
    return {
      ok: true,
      message: "Servicios obtenidos",
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
