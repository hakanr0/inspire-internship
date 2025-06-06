import { Router } from "express";
import { login, logout, signup, me } from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/logout", logout);
router.get("/me", me);

export default router;
