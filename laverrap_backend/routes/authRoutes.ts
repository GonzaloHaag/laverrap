import { Router } from "express";
import authController from "../controllers/authController.ts";

const authRoutes = Router();

authRoutes.post("/login", authController.loginUser);

export default authRoutes;
