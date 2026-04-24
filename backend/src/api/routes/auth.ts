import { logout, login } from '../controllers/authcontroller';
import { Router } from 'express';
const router = Router();

router.post('/login', login);
router.post('/logout', logout);

export default router;
