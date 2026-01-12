import { Router } from "express";
import { hireFreelancer } from "../controller/hire.controller.js"; 
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// PATCH /api/hire/:BidId
router.patch("/:BidId", protect, hireFreelancer);

export default router;