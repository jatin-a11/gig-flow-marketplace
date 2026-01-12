import {Router} from 'express'
import { register, login, getMe } from "../controller/auth.controller.js";
import {protect} from "../middleware/authMiddleware.js"

const router = Router()

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

router.get("/me", protect, getMe);

export default router;