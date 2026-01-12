import express from 'express';
import { 
  createGig, 
  getAllGigs, 
  getGigById, 
  getMyGigs,
  hireFreelancer // Sab ek hi controller mein hain toh aise
} from '../controller/gig.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// 1. Static Routes (Pehle aane chahiye)
router.get('/my-gigs', protect, getMyGigs);
router.patch('/hire', protect, hireFreelancer); 

// 2. Action Routes
router.post('/', protect, createGig);
router.get('/', getAllGigs);

// 3. Dynamic Routes (Ye hamesha last mein)
router.get('/:id', getGigById); 

export default router;
