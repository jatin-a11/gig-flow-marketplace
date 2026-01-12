import { Gig } from '../model/Gig.model.js';

export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const newGig = new Gig({
      title,
      description,
      budget,
      ownerId: req.user.id,
      status: 'open'
    });

    await newGig.save();
    res.status(201).json(newGig); 
    
  } catch (error) {
    console.error("Create Gig Error:", error);
    res.status(500).json({ message: "Error creating gig", error: error.message }); 
  }
};

export const getAllGigs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { status: 'open' };

    if (search) {
      query.title = { $regex: search, $options: 'i' }; 
    }

    const gigs = await Gig.find(query).populate('ownerId', 'name');
    res.status(200).json(gigs);

  } catch (error) {
    console.error("Fetch Gigs Error:", error);
    res.status(500).json({ message: "Error fetching gigs", error: error.message }); 
  }
};

export const getGigById = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id).populate('ownerId', 'name');
        if (!gig) return res.status(404).json({ message: "Gig not found" });
        res.status(200).json(gig);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getMyGigs = async (req, res) => {
  try {
    
    const gigs = await Gig.find({ ownerId: req.user.id })
      .populate({
        path: 'bids', 
        populate: { 
          path: 'freelancerId', 
          select: 'name email'  
        }
      });

    console.log("Gigs found with bids:", JSON.stringify(gigs, null, 2));
    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
  }
};

import { Bid } from '../model/Bid.model.js'; 

export const hireFreelancer = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { gigId, bidId } = req.body;

        const gig = await Gig.findOne({ _id: gigId, status: 'open' }).session(session);
        
        if (!gig) {
            throw new Error("Gig is already assigned or closed.");
        }

        gig.status = 'assigned';
        await gig.save({ session });

        await Bid.findByIdAndUpdate(bidId, { status: 'accepted' }, { session });

        await Bid.updateMany(
            { gigId: gigId, _id: { $ne: bidId } },
            { status: 'rejected' },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Freelancer hired successfully!", gig });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: "Hiring error", error: error.message });
    }
};