import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const clientController = {
  getAll: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    try {
      const clients = await prisma.client.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true, 
          name: true, 
          phone: true, 
          email: true, 
          car_model: true,
          car_plate: true,
          car_type: true,
          status:true,
          _count: {
             select: { washed: true }
          }
        }
      });

      return res.status(200).json({
        ok: true,
        message: "Clientes obtenidos correctamente",
        data: clients,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        ok: false,
        message: "Error al obtener los servicios",
      });
    }
  },
};
