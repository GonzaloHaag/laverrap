import { ITEMS_PER_PAGE } from "@/lib/consts";
import { ClientSchema } from "@/schemas";
import { supabaseClient } from "@/supabase/supabase-client";
import type { ApiResponse } from "@/types/api-response";
import type { Client, ClientWithWashes, NewClient } from "@/types/client";
import { safeParse } from "valibot";

export const getAllClients = async ({
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
}): Promise<ApiResponse<ClientWithWashes[]>> => {
  const start = page * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE - 1;
  const query = supabaseClient
    .from("clients")
    .select(`*, washed!left(count)`, { count: "exact" })
    .order("name", { ascending: true })
    .eq("user_id", userId)
    .eq("washed.status", "completed")
    .range(start, end);
  if (filters.searchValue.trim() !== "") {
    query.or(
      `name.ilike.%${filters.searchValue}%, email.ilike.%${filters.searchValue}%, patent.ilike.%${filters.searchValue}%`
    );
  }
  if (filters.statusValue !== "") {
    query.eq("status", filters.statusValue as "active" | "inactive");
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
    message: "Exito al obtener los clientes",
    data: data,
    totalPages,
  };
};

export const createOrUpdateClient = async ({
  client,
  clientId,
}: {
  client: NewClient;
  clientId: number | null;
}): Promise<ApiResponse<Client>> => {
  try {
    const result = safeParse(ClientSchema, client);
    if (!result.success) {
      return {
        ok: false,
        message: "Datos inválidos",
      };
    }

    let query;
    if (clientId) {
      query = supabaseClient
        .from("clients")
        .update(client)
        .eq("id", clientId)
        .select()
        .single();
    } else {
      query = supabaseClient.from("clients").insert(client).select().single();
    }

    const { data, error } = await query;
    if (error) {
      return {
        ok: false,
        message: error.message || "Error al crear o actualizar el cliente",
      };
    }

    return {
      ok: true,
      message: clientId ? "Cliente actualizado" : "Cliente creado",
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

export const updateClient = async ({
  client,
}: {
  client: Client;
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
      .update(client)
      .eq("id", client.id)
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        message: error.message || "Error al actualizar el cliente",
      };
    }

    return {
      ok: true,
      message: "Cliente actualizado",
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

export const getClientsForSelect = async ({
  userId,
}: {
  userId: string;
}): Promise<
  ApiResponse<Pick<Client, "id" | "name" | "model_brand" | "patent">[]>
> => {
  try {
    const { data, error } = await supabaseClient
      .from("clients")
      .select("id, name, model_brand, patent")
      .eq("user_id", userId)
      .eq("status", "active")
      .order("name", { ascending: true });

    if (error) {
      return {
        ok: false,
        message:
          error.message || "Error al obtener los nombres de los clientes",
      };
    }
    return {
      ok: true,
      message: "ok",
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
