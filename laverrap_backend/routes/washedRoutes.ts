import { Router } from "express";
import washingController from "../controllers/washingController.ts";


const washedRoutes = Router();
washedRoutes.get("/", washingController.getAllWashing);
washedRoutes.post("/", washingController.createWashing);
export default washedRoutes;
