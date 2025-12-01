import { Request, Response } from "express";
import { clientService } from "../services/client.service";
import { responseSuccess } from "../utils/response-success";
import { clientSchema, type Client } from "../schemas/client.schema";

export const clientController = {
  getAll: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const clients = await clientService.getAllClients(userId!);
    responseSuccess<Client[]>(res, 200, clients);
  },
  create: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const validatedFields = clientSchema.parse(req.body);
    const newClient = await clientService.createClient(
      userId!,
      validatedFields
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
      validatedFields
    );
    responseSuccess<Client>(res, 200, updatedClient);
  },
  deleteById: async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const clientId = Number(req.params.id);
    await clientService.deleteClient(clientId, userId!);
    responseSuccess<null>(res, 204, null);
  },
};
