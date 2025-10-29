import { Router } from "express";
import serviceController from "../controllers/serviceController.ts";

const servicesRoutes = Router();

servicesRoutes.get("/", serviceController.getAllServices);
servicesRoutes.get("/:id", serviceController.getServiceById);
servicesRoutes.post("/", serviceController.createService);
servicesRoutes.put("/:id", serviceController.updateService);
servicesRoutes.delete("/:id", serviceController.deleteService);
export default servicesRoutes;
