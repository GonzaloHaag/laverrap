import { prisma } from "../lib/prisma";
import { Service } from "../schemas/service.schema";
import { ServiceResponse } from "../types/api/service.response";
import { ClientError } from "../utils/errors";

export const serviceService = {
  getAllServices: async (
    userId: number,
  ): Promise<ServiceResponse> => {
    const [services, total, averagePrice] = await Promise.all([
      prisma.service.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          name: true,
          price: true,
          category: true,
          duration: true,
          status: true,
          description: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.service.count({
        where: {
          userId: userId,
        },
      }),
      prisma.service.aggregate({
        _avg: {
           price: true,
        },
        where: {
          userId: userId,
        }
      })
    ]);
    return { services, total, averagePrice: averagePrice._avg.price};
  },

  createService: async (userId: number, data: Service): Promise<Service> => {
    const existingService = await prisma.service.findUnique({
      where: {
        name: data.name,
      },
    });
    if (existingService)
      throw new ClientError("El nombre del servicio ya está en uso", 409);
    const service = await prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        duration: data.duration,
        category: data.category,
        userId: userId,
      },
    });

    return service;
  },

  updateService: async (
    serviceId: number,
    userId: number,
    data: Service,
  ): Promise<Service> => {
    const findService = await prisma.service.findUnique({
      where: {
        id: serviceId,
        userId: userId,
      },
    });
    if (!findService) throw new ClientError("Id inválido", 404);

    const updatedService = await prisma.service.update({
      where: {
        id: serviceId,
        userId: userId,
      },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        duration: data.duration,
        category: data.category,
      },
    });

    return updatedService;
  },

  deleteService: async (serviceId: number, userId: number): Promise<void> => {
    const findRelation = await prisma.washing.findFirst({
      where: {
        serviceId: serviceId,
        userId: userId,
      },
    });
    if (findRelation)
      throw new ClientError(
        "No se puede eliminar el servicio porque tiene lavados asociados",
        400,
      );
    const findService = await prisma.service.findUnique({
      where: {
        id: serviceId,
        userId: userId,
      },
    });
    if (!findService) throw new ClientError("Id inválido", 404);

    await prisma.service.delete({
      where: {
        id: serviceId,
        userId: userId,
      },
    });

    return;
  },
};
