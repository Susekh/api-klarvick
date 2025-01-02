import { Router } from "express";
import FetchProjectController from "../../controller/fetch/FetchProjectController.js";
import FetchSprintController from "../../controller/fetch/FetchSprintController.js";
const router = Router();
router.post("/project", FetchProjectController);
router.post("/sprint", FetchSprintController);
export default router;
//# sourceMappingURL=fetchRouter.js.map