import { Request, Response } from "express";
import { clientService } from "../services/client.service";
import { responseSuccess } from "../utils/response-success";
import { clientSchema, type Client } from "../schemas/client.schema";
import { ClientResponse } from "../types/api/client.response";

export const clientController = {
  getAll: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { clients, total, totalActive, totalInactive, totalNewsMonth } =
      await clientService.getAllClients(userId!);
    responseSuccess<ClientResponse>(res, 200, {
      clients,
      total,
      totalActive,
      totalInactive,
      totalNewsMonth,
    });
  },
  create: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const validatedFields = clientSchema.parse(req.body);
    const newClient = await clientService.createClient(
      userId!,
      validatedFields,
    );
    responseSuccess<Client>(res, 201, newClient);
  },
  updateById: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const clientId = Number(req.params.id);
    const validatedFields = clientSchema.parse(req.body);
    const updatedClient = await clientService.updateClient(
      clientId,
      userId!,
      validatedFields,
    );
    responseSuccess<Client>(res, 200, updatedClient);
  },
  updateStatusById: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const clientId = Number(req.params.id);
    const updatedClient = await clientService.updateStatusClient(
      clientId,
      userId!,
    );
    responseSuccess<Client>(res, 200, updatedClient);
  },
};
