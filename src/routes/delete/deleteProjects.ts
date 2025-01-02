import { Router } from "express";
import { verifyJWTForProfile } from "../../middleware/verifyJWTForProfile.js";
import deleteProjectController from "../../controller/delete/project/deleteProjectController.js";

const router = Router();

router.post("/delete-Project", verifyJWTForProfile, deleteProjectController);

export default router;