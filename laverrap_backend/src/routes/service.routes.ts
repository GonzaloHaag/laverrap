import express from "express";
import { serviceController } from "../controllers/service.controller";
import { catchedAsync } from "../utils/catched-async";

const router = express.Router();

router.get("/", catchedAsync(serviceController.getAll));
router.post("/", catchedAsync(serviceController.create));
router.get("/:id", catchedAsync(serviceController.getById));
router.put("/:id", catchedAsync(serviceController.updateById));
router.delete("/:id", catchedAsync(serviceController.deleteById));
export default router;
