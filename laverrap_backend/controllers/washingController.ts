import type { Response } from "express";
import type { RequestAuth } from "../types/requestAuth.ts";
import { supabase } from "../lib/supabase.ts";
import { validateWashing } from "../schemas/WashingSchema.ts";
import z from "zod";
const getAllWashing = async (req: RequestAuth, res: Response) => {
  const user = req.user;

  const { data, error } = await supabase
    .from("washed")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error al obtener los lavados",
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Lavados obtenidos correctamente",
    washing: data,
  });
};

const createWashing = async (req: RequestAuth, res: Response) => {
  const user = req.user;
  const result = validateWashing(req.body);
  
  if (!result.success) {
    return res.status(400).json({
      ok: false,
      message: "Datos inválidos",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }

  const { data, error } = await supabase
  .from("washed")
  .insert({
     client_id: result.data.client_id,
     service_id: result.data.service_id,
     status: result.data.status,
     notified_client: result.data.notified_client,
     user_id: user.id
  })
  .select()
  .single();

  if (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error al crear el lavado",
    });
  }

  return res.status(201).json({
    ok: true,
    message: "Lavado creado correctamente",
    washing: data,
  });
};

export default {
  getAllWashing,
  createWashing,
};
