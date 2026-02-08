import { Request, Response } from "express";
import { employeeService } from "../services/employee.service";
import { responseSuccess } from "../utils/response-success";
import { employeeSchema } from "../schemas/employee.schema";
import { EmployeeResponse } from "../types/api/employee.response";

export const employeeController = {
  getAll: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { employees, total, totalActive, totalInactive } =
      await employeeService.getAllEmployees(userId!);
    responseSuccess<EmployeeResponse>(res, 200, {
      employees,
      total,
      totalActive,
      totalInactive,
    });
  },
  create: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const validatedFields = employeeSchema.parse(req.body);
    const employee = await employeeService.createEmployee(
      userId!,
      validatedFields,
    );
    responseSuccess(res, 201, employee);
  },
  updateById: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const employeeId = Number(req.params.id);
    const validatedFields = employeeSchema.parse(req.body);
    const updatedEmployee = await employeeService.updateEmployee(
      employeeId,
      userId!,
      validatedFields,
    );
    responseSuccess(res, 200, updatedEmployee);
  },
  updateStatusById: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const employeeId = Number(req.params.id);
    const updatedEmployee = await employeeService.updateStatusEmployee(
      employeeId,
      userId!,
    );
    responseSuccess(res, 200, updatedEmployee);
  },
};
