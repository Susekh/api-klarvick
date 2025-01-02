import { Router } from "express";
import { verifyJWTForProfile } from "../../middleware/verifyJWTForProfile.js";
import createTaskController from "../../controller/create/sprint/column/task/createTaskController.js";
const router = Router();
router.post("/newTask", verifyJWTForProfile, createTaskController);
export default router;
//# sourceMappingURL=createTasks.js.map