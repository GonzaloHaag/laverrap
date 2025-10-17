import { ITEMS_PER_PAGE } from "@/lib/consts";
import { WashingSchema } from "@/schemas";
import { supabaseClient } from "@/supabase/supabase-client";
import type { ApiResponse } from "@/types/api-response";
import type { NewWashing, Washing } from "@/types/washing";
import { safeParse } from "valibot";

export const getAllWashes = async ({
  userId,
  filters,
  page,
}: {
  userId: string;
  filters: {
    searchValue: string;
    statusValue: string;
  };
  page: number;
}): Promise<ApiResponse<Washing[]>> => {
  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE - 1;
  const query = supabaseClient
    .from("washed")
    .select(`*, clients(*), services(*)`, { count: "exact" })
    .order("created_at", { ascending: false })
    .eq("user_id", userId)
    .range(start, end);
  if (filters.searchValue.trim() !== "") {
    query.or(
      `clients.name.ilike.%${filters.searchValue}%, clients.patent.ilike.%${filters.searchValue}%, services.name.ilike.%${filters.searchValue}%`
    );
  }
  if (filters.statusValue !== "") {
    query.eq(
      "status",
      filters.statusValue as "in_progress" | "completed" | "cancelled"
    );
  }
  const { data, error, count } = await query;

  if (error) {
    return {
      ok: false,
      message: error.message,
    };
  }
  const totalPages = Math.ceil(count! / ITEMS_PER_PAGE);
  return {
    ok: true,
    message: "Exito al obtener los lavados",
    data: data,
    totalPages,
  };
};

export const createWashing = async ({
  washing,
}: {
  washing: NewWashing;
}): Promise<ApiResponse<NewWashing>> => {
  try {
    const result = safeParse(WashingSchema, washing);
    if (!result.success) {
      return {
        ok: false,
        message: "Datos inválidos",
      };
    }

    const { data, error } = await supabaseClient
      .from("washed")
      .insert(washing)
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        message: error.message || "Error al crear el lavado",
      };
    }

    return {
      ok: true,
      message: "Lavado creado",
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

export const updateStatusWashing = async ({
  washingId,
  status,
}: {
  washingId: number;
  status: "in_progress" | "completed" | "cancelled";
}): Promise<ApiResponse<Washing>> => {
  try {
    const { data, error } = await supabaseClient
      .from("washed")
      .update({ status })
      .eq("id", washingId)
      .select("*, clients(*), services(*)")
      .single();

    if (error) {
      return {
        ok: false,
        message: error.message || "Error al actualizar el estado del lavado",
      };
    }

    return {
      ok: true,
      message: "Estado del lavado actualizado",
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

export const deleteWashingById = async ({
  washingId,
}: {
  washingId: number;
}): Promise<ApiResponse<Washing>> => {
  if (!washingId) {
    return {
      ok: false,
      message: "ID de lavado inválido",
    };
  }
  try {
    const { data, error } = await supabaseClient
      .from("washed")
      .delete()
      .eq("id", washingId)
      .select("*, clients(*), services(*)")
      .single();

    if (error) {
      return {
        ok: false,
        message: error.message || "Error al eliminar el lavado",
      };
    }

    return {
      ok: true,
      message: "Lavado eliminado",
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
