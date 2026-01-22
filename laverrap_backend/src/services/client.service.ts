import { prisma } from "../lib/prisma";
import type { Client } from "../schemas/client.schema";
import { ClientError } from "../utils/errors";

export const clientService = {
  getAllClients: async (userId: number) => {
    const clients = await prisma.client.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        car_model: true,
        car_plate: true,
        car_type: true,
        status: true,
        _count: {
          select: { washed: true },
        },
      },
    });

    return clients;
  },

  createClient: async (userId: number, data: Client) => {
    const client = await prisma.client.create({
      data: {
        name: data.name,
        email: data.email,
        car_type: data.car_type,
        car_model: data.car_model,
        car_plate: data.car_plate,
        status: data.status,
        userId: userId,
      },
    });
    return client;
  },

  updateClient: async (clientId: number, userId: number, data: Client) => {
    const findClient = await prisma.client.findUnique({
      where: {
        id: clientId,
        userId: userId,
      },
    });
    if (!findClient) throw new ClientError("Id inválido", 400);

    const updatedClient = await prisma.client.update({
      where: {
        id: clientId,
        userId: userId,
      },
      data: {
        name: data.name,
        email: data.email,
        car_type: data.car_type,
        car_model: data.car_model,
        car_plate: data.car_plate,
        status: data.status,
      },
    });
    return updatedClient;
  },

  deleteClient: async (clientId: number, userId: number) => {
    const findClient = await prisma.client.findUnique({
      where: {
        id: clientId,
        userId: userId,
      },
    });
    if (!findClient) throw new Error("Id inválido");

    await prisma.client.delete({
      where: {
        id: clientId,
        userId: userId,
      },
    });
  }
};
