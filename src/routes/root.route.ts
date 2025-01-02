import { Router } from "express";
import AuthRouter from "./authRoutes.js";
import ProfileRouter from "./profileRoutes.js";
import createRouter from "./create/createRoutes.js"
import fetchRouter from "./fetchData/fetchRouter.js"
import deleteRouter from "./delete/deleteRoutes.js"

const router = Router();

router.get("/", (req, res) => {
    res.send("Root Route")
})

router.use("/auth", AuthRouter);
router.use("/profile", ProfileRouter);
router.use("/create", createRouter);
router.use("/fetch", fetchRouter)
router.use("/delete", deleteRouter);

export default router;