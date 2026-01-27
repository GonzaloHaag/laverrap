import express from "express";
import { clientController } from "../controllers/client.controller";
import { catchedAsync } from "../utils/catched-async";

const router = express.Router();

router.get("/", catchedAsync(clientController.getAll));
router.post("/", catchedAsync(clientController.create));
router.put("/:id", catchedAsync(clientController.updateById));
router.patch("/:id", catchedAsync(clientController.updateStatusById));

export default router;
