import express from 'express';
import { 
  createGig, 
  getAllGigs, 
  getGigById, 
  getMyGigs,
  hireFreelancer 
} from '../controller/gig.controller.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my-gigs', protect, getMyGigs);
router.patch('/hire', protect, hireFreelancer); 


router.post('/', protect, createGig);
router.get('/', getAllGigs);

router.get('/:id', getGigById); 

export default router;
