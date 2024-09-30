import { Router } from "express";
import githubLogin from "../controller/auth/oauth/githubLogin.js";
const router = Router();
router.post("/github", githubLogin);
export default router;
//# sourceMappingURL=oAuthRoutes.js.map