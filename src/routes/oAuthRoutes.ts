import { Router } from "express";
import githubLogin from "../controller/auth/oauth/githubLogin.js";
import googleLogin from "../controller/auth/oauth/googleLogin.js";

const router = Router();

router.post("/github", githubLogin);
router.post("/google", googleLogin);

export default router;

    