import { Router } from "express";
import { hireFreelancer } from "../controller/hire.controller.js"; 
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.patch("/:BidId", protect, hireFreelancer);

export default router;