import { Router } from "express";
import { verifyJWTForProfile } from "../../middleware/verifyJWTForProfile.js";
import deleteTaskController from "../../controller/delete/sprint/column/task/deleteTaskController.js";

const router = Router();

router.post("/delete-tasks", verifyJWTForProfile, deleteTaskController);

export default router;