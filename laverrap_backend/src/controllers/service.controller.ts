import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { serviceSchema } from "../schemas/service.schema";
import z from "zod";

export const serviceController = {
  getAll: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }
    try {
      const services = await prisma.service.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json({
        ok: true,
        message: "Servicios obtenidos correctamente",
        data: services,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        message: "Error al obtener los servicios",
      });
    }
  },
  create: async (req: Request, res: Response) => {
    // Lógica para crear un nuevo servicio
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        ok: false,
        message: "Usuario no autenticado",
      });
    }

    try {
      const validatedFields = serviceSchema.parse(req.body);
      const service = await prisma.service.create({
        data: {
          name: validatedFields.name,
          description: validatedFields.description,
          price: validatedFields.price,
          duration: validatedFields.duration,
          category: validatedFields.category,
          userId: userId,
        },
      });

      return res.status(201).json({
        ok: true,
        message: "Servicio creado correctamente",
        data: service,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          ok: false,
          message: "Error de validación",
          errors: error.issues,
        });
      }
      return res.status(500).json({
        ok: false,
        message: "Error en el servidor",
      });
    }
  },
  getById: async (req: Request, res: Response) => {
    // Lógica para obtener un servicio por ID
  },
  updateById: async (req: Request, res: Response) => {
    const serviceId = parseInt(req.params.id);
    const userId = req.user?.id;
    try {
      const serviceExists = await prisma.service.findUnique({
        where: {
          id: serviceId,
          userId: userId,
        },
      });
      if (!serviceExists) {
        return res.status(404).json({
          ok: false,
          message: "Servicio no encontrado",
        });
      }
      const validatedFields = serviceSchema.parse(req.body);
      const service = await prisma.service.update({
        where: {
          id: serviceId,
          userId: userId,
        },
        data: {
          name: validatedFields.name,
          description: validatedFields.description,
          price: validatedFields.price,
          duration: validatedFields.duration,
          category: validatedFields.category,
        },
      });
      return res.status(200).json({
        ok: true,
        message: "Servicio actualizado correctamente",
        data: service,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          ok: false,
          message: "Error de validación",
          errors: error.issues,
        });
      }
      return res.status(500).json({
        ok: false,
        message: "Error en el servidor",
      });
    }
  },
  deleteById: async (req: Request, res: Response) => {
    const serviceId = parseInt(req.params.id);
    const userId = req.user?.id;
    try {
      const serviceExists = await prisma.service.findUnique({
        where: {
          id: serviceId,
          userId: userId,
        },
      });
      if (!serviceExists) {
        return res.status(404).json({
          ok: false,
          message: "Servicio no encontrado",
        });
      }
      await prisma.service.delete({
        where: {
          id: serviceId,
          userId: userId,
        },
      });
      return res.status(200).json({
        ok: true,
        message: "Servicio eliminado correctamente",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        message: "Error en el servidor",
      });
    }
  },
};
