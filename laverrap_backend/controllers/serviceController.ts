import type { Response } from "express";
import { supabase } from "../lib/supabase.ts";
import { validatePartialService, validateService } from "../schemas/ServiceSchema.ts";
import type { RequestAuth } from "../types/requestAuth.ts";
import z from "zod";
const getAllServices = async (req: RequestAuth, res: Response) => {
  const user = req.user; // gracias al middleware de autenticación lo tengo en la request
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      message: "Error al obtener los servicios",
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Servicios obtenidos correctamente",
    services: data,
  });
};

const getServiceById = async (req: RequestAuth, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      ok: false,
      message: "El id del servicio es obligatorio",
    });
  }

  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", Number(id))
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.log(error);
    return res.status(400).json({
      ok: false,
      message: "Error al obtener el servicio",
    });
  }

  if (!data) {
    return res.status(404).json({
      ok: false,
      message: "No se pudo encontrar el servicio o no pertenece al usuario",
    });
  }

  return res.status(200).json({
    ok: true,
    message: "Servicio obtenido correctamente",
    service: data,
  });
};

const createService = async (req: RequestAuth, res: Response) => {
  // Lógica para crear un servicio
  const user = req.user;
  const result = validateService(req.body);
  if (!result.success) {
    return res.status(400).json({
      ok: false,
      message: "Error de validación",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }
  const { data, error } = await supabase
    .from("services")
    .insert({
      name: result.data.name,
      price: result.data.price,
      duration: result.data.duration,
      category: result.data.category,
      status: result.data.status,
      description: result.data.description,
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error al crear el servicio",
    });
  }
  return res.status(201).json({
    ok: true,
    message: "Servicio creado correctamente",
    service: data,
  });
};

const updateService = async (req: RequestAuth, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      ok: false,
      message: "El id del servicio es obligatorio",
    });
  }

  const result = validatePartialService(req.body);
  if (!result.success) {
    return res.status(400).json({
      ok: false,
      message: "Error de validación",
      errors: z.flattenError(result.error).fieldErrors,
    });
  }

  const { data, error } = await supabase
    .from("services")
    .update(result.data)
    .eq("id", Number(id))
    .eq("user_id", user.id)
    .select()
    .maybeSingle();
  if (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar el servicio",
    });
  }
  if (!data) {
    return res.status(404).json({
      ok: false,
      message: "No se pudo encontrar el servicio o no pertenece al usuario",
    });
  }
  return res.status(200).json({
    ok: true,
    message: "Servicio actualizado correctamente",
    service: data,
  });
};

const deleteService = async (req: RequestAuth, res: Response) => {
  const user = req.user;
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      ok: false,
      message: "El id del servicio es obligatorio",
    });
  }

  const { data, error } = await supabase
    .from("services")
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
          "No se puede eliminar el servicio porque está asociado a otros registros",
      });
    }
    return res.status(500).json({
      ok: false,
      message: "Error al eliminar el servicio",
    });
  }
  if (!data) {
    return res.status(404).json({
      ok: false,
      message: "No se pudo encontrar el servicio o no pertenece al usuario",
    });
  }
  return res.status(200).json({
    ok: true,
    message: "Servicio eliminado correctamente",
    service: data,
  });
};
export default {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
