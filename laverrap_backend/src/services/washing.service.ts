import { prisma } from "../lib/prisma";
import { Washing, WashingStatus } from "../schemas/washing.schema";
import { WashingResponse } from "../types/api/washing.response";
import { ClientError } from "../utils/errors";
import { nodemailerService } from "./nodemailer.service";

export const washingService = {
  getAllWashed: async (userId: number): Promise<WashingResponse> => {
    const [washed, totalToday, totalCompleted, totalInProgress, totalPending] =
      await Promise.all([
        prisma.washing.findMany({
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
        }),
        prisma.washing.count({
          where: {
            userId: userId,
            createdAt: {
              gte: new Date(new Date().setHours(0, 0, 0, 0)),
              lt: new Date(new Date().setHours(24, 0, 0, 0)),
            },
          },
        }),
        prisma.washing.count({
          where: {
            userId: userId,
            status: "COMPLETED",
          },
        }),
        prisma.washing.count({
          where: {
            userId: userId,
            status: "IN_PROGRESS",
          },
        }),
        prisma.washing.count({
          where: {
            userId: userId,
            status: "PENDING",
          },
        }),
      ]);
    return {
      washed,
      totalToday,
      totalCompleted,
      totalInProgress,
      totalPending,
    };
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
        emailSentAt: null,
      },
    });
    return washing;
  },
  changeStatusWashing: async (
    userId: number,
    washingId: number,
    status: WashingStatus,
  ): Promise<Washing> => {
    const findWashing = await prisma.washing.findUnique({
      where: {
        id: washingId,
        userId: userId,
      },
    });
    if (!findWashing) throw new ClientError("Id inválido", 404);
    if (findWashing.status === status)
      throw new ClientError("El lavado ya esta en ese estado.");
    if (findWashing.status === "COMPLETED")
      throw new ClientError(
        "El lavado ya esta completado, no se puede modificar.",
      );
    if (status === "COMPLETED" && findWashing.status === "CANCELLED")
      throw new ClientError("No se puede completar un lavado cancelado");
    const updatedWashing = await prisma.washing.update({
      where: {
        id: washingId,
        userId: userId,
      },
      data: {
        status: status,
      },
    });

    if (status === "COMPLETED" && findWashing.notify) {
      try {
        await nodemailerService.sendEmail(findWashing.clientId, userId);
        await prisma.washing.update({
          where: {
            id: washingId,
            userId: userId,
          },
          data: {
            emailSentAt: new Date(),
          },
        });
        console.log("Email sent successfully");
      } catch (error) {
        console.error(
          `Error al enviar email para el lavado ${washingId}:`,
          error,
        );
        throw new ClientError("Error al enviar el email de notificación.", 500);
      }
    }

    return updatedWashing;
  },

  deleteWashing: async (washingId: number, userId: number): Promise<void> => {
    const findWashing = await prisma.washing.findUnique({
      where: {
        id: washingId,
        userId: userId,
      },
    });
    if (!findWashing) throw new ClientError("Id inválido", 404);

    await prisma.washing.delete({
      where: {
        id: washingId,
        userId: userId,
      },
    });

    return;
  },
};
