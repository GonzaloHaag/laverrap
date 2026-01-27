import express from "express";
import { catchedAsync } from "../utils/catched-async";
import { employeeController } from "../controllers/employee.controller";
const router = express.Router();

router.get("/", catchedAsync(employeeController.getAll));
router.post("/", catchedAsync(employeeController.create));
router.put("/:id", catchedAsync(employeeController.updateById));
router.patch("/:id", catchedAsync(employeeController.updateStatusById));

export default router;
