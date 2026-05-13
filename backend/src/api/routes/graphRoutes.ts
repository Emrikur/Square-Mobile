import { Router } from "express";
import { getGraphsData} from "../controllers/graphcontroller";
import { getGraphsWeekData} from "../controllers/graphcontroller";
import authMiddleware from "../middleware/authMiddleware"

const router = Router();

router.get("/:filterCat", authMiddleware, getGraphsData)
router.get("/week", authMiddleware, getGraphsWeekData)



export default router
