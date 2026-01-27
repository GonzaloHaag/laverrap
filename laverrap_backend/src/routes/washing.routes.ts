import express from "express";
import { catchedAsync } from "../utils/catched-async";
import { washingController } from "../controllers/washing.controller";

const router = express.Router();

router.get("/", catchedAsync(washingController.getAll));
router.post("/", catchedAsync(washingController.create));
router.patch("/:id", catchedAsync(washingController.updateStatusById));

export default router;