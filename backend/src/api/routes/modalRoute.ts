import { Router } from "express";
import { getCompanies} from "../controllers/modalcontroller";
import authMiddleware from "../middleware/authMiddleware"

const router = Router();

router.get("/companies", authMiddleware, getCompanies)



export default router
