import { Router } from "express";
import Authrouter from "./authRoutes.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Root Route")
})

router.use("/auth", Authrouter);

export default router;