import { Router } from "express";
const router = Router();
router.get("/", (req, res) => {
    res.send("ugaBuga");
});
router.get("/auth", (req, res) => {
    res.send("This is auth route");
});
export default router;
//# sourceMappingURL=auth.route.js.map