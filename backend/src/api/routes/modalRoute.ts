import { Router } from "express";
import { getCompanies} from "../controllers/modalcontroller";
import { addEntry} from "../controllers/modalcontroller";
import authMiddleware from "../middleware/authMiddleware"

const router = Router();

router.get("/companies", authMiddleware, getCompanies)
router.post("/create", authMiddleware, addEntry)



export default router
