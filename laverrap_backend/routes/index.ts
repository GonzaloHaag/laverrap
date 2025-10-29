import { Router } from "express";
import authRoutes from "./authRoutes.ts";
import servicesRoutes from "./servicesRoutes.ts";
import { protectedRoute } from "../middleware.ts";
import clientsRoutes from "./clientsRoutes.ts";
import washedRoutes from "./washedRoutes.ts";

const routes = Router();
routes.use("/auth", authRoutes);
routes.use(protectedRoute);
routes.use("/services", servicesRoutes);
routes.use("/clients", clientsRoutes);
routes.use("/washed", washedRoutes);

export default routes;
