import { prisma } from "../lib/prisma";
import type { Employee } from "../schemas/employee.schema";
import { EmployeeResponse } from "../types/api/employee.response";
import { ClientError } from "../utils/errors";

export const employeeService = {
  getAllEmployees: async (userId: number): Promise<EmployeeResponse> => {
    const [employees, total, totalActive, totalInactive] = await Promise.all([
      prisma.employee.findMany({
        where: {
          userId: userId,
        },
        orderBy: [
          { status: "asc" }, // Primero activos (true)
          { createdAt: "desc" }, // Luego ordenados por fecha
        ],
        select: {
          id: true,
          name: true,
          phone: true,
          entry_time: true,
          departure_time: true,
          status: true,
          _count: {
            select: { washed: true },
          },
        },
      }),
      prisma.employee.count({
        where: {
          userId: userId,
        },
      }),
      prisma.employee.count({
        where: {
          userId: userId,
          status: "ACTIVE",
        },
      }),
      prisma.employee.count({
        where: {
          userId: userId,
          status: "INACTIVE",
        },
      }),
    ]);

    return { employees, total, totalActive, totalInactive };
  },
  createEmployee: async (userId: number, data: Employee) => {
    const employee = await prisma.employee.create({
      data: {
        name: data.name,
        phone: data.phone,
        entry_time: data.entry_time,
        departure_time: data.departure_time,
        status: data.status,
        userId: userId,
      },
    });
    return employee;
  },

  updateEmployee: async (
    employeeId: number,
    userId: number,
    data: Employee,
  ) => {
    const findEmployee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
        userId: userId,
      },
    });
    if (!findEmployee) throw new ClientError("Id inválido", 404);

    const updatedEmployee = await prisma.employee.update({
      where: {
        id: employeeId,
        userId: userId,
      },
      data: {
        name: data.name,
        phone: data.phone,
        entry_time: data.entry_time,
        departure_time: data.departure_time,
        status: data.status,
      },
    });
    return updatedEmployee;
  },

  updateStatusEmployee: async (employeeId: number, userId: number) => {
    const findEmployee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
        userId: userId,
      },
    });
    if (!findEmployee) throw new ClientError("Id inválido", 404);
    const updatedEmployee = await prisma.employee.update({
      where: {
        id: employeeId,
        userId: userId,
      },
      data: {
        status: findEmployee.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
      },
    });
    return updatedEmployee;
  },
};
