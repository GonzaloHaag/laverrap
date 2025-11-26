import express from "express";
import { serviceController } from "../controllers/service.controller";

const router = express.Router();

router.get("/", serviceController.getAll);
router.post("/", serviceController.create);
router.get("/:id", serviceController.getById);
router.put("/:id", serviceController.updateById);
router.delete("/:id", serviceController.deleteById);

export default router;