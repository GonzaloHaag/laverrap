import type { Response } from "express";
import type { RequestAuth } from "../types/requestAuth.ts";
import { supabase } from "../lib/supabase.ts";
import z from "zod";
import {
  validateClient,
  validatePartialClient,
} from "../schemas/ClientSchema.ts";
const getAllClients = async (req: RequestAuth, res: Response) => {
  const user = req.user; // gracias al middleware de autenticación lo tengo en la request
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("Error fetching clients:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener los clientes",
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Clientes obtenidos correctamente",
    clients: data,
  });
};

const getClientById = async (req: RequestAuth, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      ok: false,
      message: "El id del cliente es obligatorio",
    });
  }

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", Number(id))
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.log("Error fetching client:", error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener el cliente",
    });
  }

  if (!data) {
    return res.status(404).json({
      ok: false,
      message: "No se pudo encontrar el cliente o no pertenece al usuario",
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Cliente obtenido correctamente",
    client: data,
  });
};

const createClient = async (req: RequestAuth, res: Response) => {
  const user = req.user;
  const result = validateClient(req.body);
  if (!result.success) {
    return res.status(400).json({
      ok: false,
      message: "Error al validar los datos",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }

  const { data, error } = await supabase
    .from("clients")
    .insert({
      name: result.data.name,
      phone: result.data.phone,
      description: result.data.description,
      status: result.data.status,
      vehicle_type: result.data.vehicle_type,
      model_brand: result.data.model_brand,
      patent: result.data.patent,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error al crear el cliente",
    });
  }

  return res.status(201).json({
    ok: true,
    message: "Cliente creado correctamente",
    client: data,
  });
};

export const updateClient = async (req: RequestAuth, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      ok: false,
      message: "El id del cliente es obligatorio",
    });
  }
  const result = validatePartialClient(req.body);
  if (!result.success) {
    return res.status(400).json({
      ok: false,
      message: "Error al validar los datos",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }
  const { data, error } = await supabase
    .from("clients")
    .update({
      ...result.data,
    })
    .eq("id", Number(id))
    .eq("user_id", user.id)
    .select()
    .maybeSingle();

  if (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar el cliente",
    });
  }

  if (!data) {
    return res.status(404).json({
      ok: false,
      message: "No se pudo encontrar el cliente o no pertenece al usuario",
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Cliente actualizado correctamente",
    client: data,
  });
};

export const deleteClient = async (req: RequestAuth, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      ok: false,
      message: "El id del cliente es obligatorio",
    });
  }

  const { data, error } = await supabase
    .from("clients")
    .delete()
    .eq("id", Number(id))
    .eq("user_id", user.id)
    .select()
    .maybeSingle();

  if (error) {
    console.log(error);
    if (error.code === "23503") {
      return res.status(400).json({
        ok: false,
        message:
          "No se puede eliminar el cliente porque está asociado a otros registros",
      });
    }
    return res.status(500).json({
      ok: false,
      message: "Error al eliminar el cliente",
    });
  }

  if (!data) {
    return res.status(404).json({
      ok: false,
      message: "No se pudo encontrar el cliente o no pertenece al usuario",
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Cliente eliminado correctamente",
  });
};

export default {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
