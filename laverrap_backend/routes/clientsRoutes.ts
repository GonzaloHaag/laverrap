import { Router } from "express";
import clientController from "../controllers/clientController.ts";

const clientsRoutes = Router();
clientsRoutes.get("/", clientController.getAllClients);
clientsRoutes.get("/:id", clientController.getClientById);
clientsRoutes.post("/", clientController.createClient);
clientsRoutes.put("/:id", clientController.updateClient);
clientsRoutes.delete("/:id", clientController.deleteClient);
export default clientsRoutes;