import express from "express";
import { clientController } from "../controllers/client.controller";

const router = express.Router();

router.get("/", clientController.getAll);

export default router;