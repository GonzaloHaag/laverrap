import express from "express";
import { authController } from "../controllers/auth.controller";
import { catchedAsync } from "../utils/catched-async";
const router = express.Router();

router.post("/login", catchedAsync(authController.login));

export default router;