import { prisma } from "../lib/prisma";
import type { Client } from "../schemas/client.schema";
import { ClientResponse } from "../types/api/client.response";
import { ClientError } from "../utils/errors";

export const clientService = {
  getAllClients: async (userId: number): Promise<ClientResponse> => {
    const [clients, total, totalActive, totalInactive, totalNewsMonth] = await Promise.all([
      prisma.client.findMany({
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
    }),
    await prisma.client.count({
      where: {
        userId: userId,
      },
    }),
    await prisma.client.count({
      where: {
        userId: userId,
        status: "ACTIVE",
      },
    }),
     await prisma.client.count({
      where: {
        userId: userId,
        status: "INACTIVE",
      },
    }),
    await prisma.client.count({
      where: {
        userId: userId,
        createdAt: {
          gte: new Date(new Date().setDate(new Date().getDate() - 30)),
        },
      },
    }),
    ]);

    return { clients, total, totalActive, totalInactive, totalNewsMonth };
  },

  createClient: async (userId: number, data: Client) => {
    const existingClient = await prisma.client.findUnique({
      where: {
        email: data.email,
        userId: userId,
      },
    });
    if (existingClient) throw new ClientError("El email ya esta en uso", 409);
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
    if (!findClient) throw new ClientError("Id inválido", 404);

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
  updateStatusClient: async (clientId: number, userId: number) => {
    const findClient = await prisma.client.findUnique({
      where: {
        id: clientId,
        userId: userId,
      },
    });
    if (!findClient) throw new ClientError("Id inválido", 404);

    const newStatus = findClient.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    const updatedClient = await prisma.client.update({
      where: {
        id: clientId,
        userId: userId,
      },
      data: {
        status: newStatus,
      },
    });
    return updatedClient;
  },

  getClientById: async (clientId: number, userId: number) => {
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
        userId: userId,
      },
    });
    if (!client) throw new ClientError("Cliente no encontrado", 404);
    return client;
  },
};
