import { Router } from "express";
import { getCompanies } from "../controllers/companyController";
import authMiddleware from "../middleware/authMiddleware";

const router = Router();

router.get("/:id", authMiddleware, getCompanies);

export default router;
