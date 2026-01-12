import { Router } from "express";
import { createBid, getFreelancerBids } from "../controller/bid.Controller.js";
import { hireFreelancer } from "../controller/hire.controller.js"; // Controller ko direct import karein
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

// Bid create karne ke liye: POST /api/bids
router.post('/', protect, createBid); 

// Freelancer hire karne ke liye: PATCH /api/bids/:BidId/hire
router.patch('/:BidId/hire', protect, hireFreelancer); // Ab ye sahi chalega

router.get('/my-bids', protect, getFreelancerBids);

export default router;