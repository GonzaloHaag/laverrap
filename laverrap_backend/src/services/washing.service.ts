import { prisma } from "../lib/prisma";
import { Washing } from "../schemas/washing.schema";

export const washingService = {
  getAllWashed: async (userId: number): Promise<Washing[]> => {
    const washed = await prisma.washing.findMany({
      where: {
        userId: userId,
      },
      include: {
        client: true,
        employee: true,
        service: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return washed;
  },

  createWashing: async (userId: number, data: Washing): Promise<Washing> => {
    const washing = await prisma.washing.create({
      data: {
        status: data.status,
        serviceId: data.serviceId,
        employeeId: data.employeeId,
        clientId: data.clientId,
        userId: userId,
        details: data.details,
        notify: data.notify,
      },
    });
    return washing;
  },
};
