import express from "express";
import { checkAuth, login, logout, signup } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout); //any request that changes server state should NOT be GET.

router.get("/check", protectRoute, checkAuth);

export default router;