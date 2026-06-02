import { Router } from "express";
import { getCompanies, getCompanyHours } from "../controllers/companyController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/user/:id", authMiddleware, getCompanies);
router.get("/total-hours", authMiddleware, getCompanyHours);

export default router;
