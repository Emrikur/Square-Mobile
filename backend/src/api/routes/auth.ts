import { logout, login } from "../controllers/authcontroller";
import { Router } from "express";
// import authMiddleware from '../middleware/authMiddleware';
const router = Router();

// router.use(authMiddleware);
router.post("/login", login);
router.post("/logout", /* authMiddleware, */ logout);
export default router;
