import { Request, Response } from "express";
import { type Service, serviceSchema } from "../schemas/service.schema";
import { serviceService } from "../services/service.service";
import { responseSuccess } from "../utils/response-success";

export const serviceController = {
  getAll: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const services = await serviceService.getAllServices(userId!);
    responseSuccess<Service[]>(res, 200, services);
  },
  create: async (req: Request, res: Response) => {
    // Lógica para crear un nuevo servicio
    const userId = req.user?.id;
    const validatedFields = serviceSchema.parse(req.body);
    const serviceCreated = await serviceService.createService(
      userId!,
      validatedFields
    );
    responseSuccess<Service>(res, 201, serviceCreated);
  },
  getById: async (req: Request, res: Response) => {
    // Lógica para obtener un servicio por ID
  },
  updateById: async (req: Request, res: Response) => {
    const serviceId = parseInt(req.params.id);
    const userId = req.user?.id;
    const validatedFields = serviceSchema.parse(req.body);
    const service = await serviceService.updateService(
      serviceId,
      userId!,
      validatedFields
    );
    responseSuccess<Service>(res, 200, service);
  },
  deleteById: async (req: Request, res: Response) => {
    const serviceId = parseInt(req.params.id);
    const userId = req.user?.id;
    await serviceService.deleteService(serviceId, userId!);
    responseSuccess<null>(res, 200, null);
  },
};
