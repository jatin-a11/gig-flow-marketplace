import { Router } from "express";
import { createBid, getFreelancerBids } from "../controller/bid.Controller.js";
import { hireFreelancer } from "../controller/hire.controller.js"; 
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post('/', protect, createBid); 

router.patch('/:BidId/hire', protect, hireFreelancer); 

router.get('/my-bids', protect, getFreelancerBids);

export default router;