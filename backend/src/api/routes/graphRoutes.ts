import { Router } from "express";
import { getGraphsData, getAllTimeData, getGraphsWeekData, getdraftMonths} from "../controllers/graphcontroller";
import authMiddleware from "../middleware/authMiddleware"

const router = Router();

router.get("/graph/:filterCat", authMiddleware, getGraphsData)
router.get("/allTime/:filterCategory", authMiddleware, getAllTimeData)
router.get("/draftmonths", authMiddleware, getdraftMonths)
router.get("/graph/week", authMiddleware, getGraphsWeekData)



export default router
