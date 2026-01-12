import { Gig } from '../model/Gig.model.js';

export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    const newGig = new Gig({
      title,
      description,
      budget,
      ownerId: req.user.id, // Yahan .id lagana zaroori hai
      status: 'open'
    });

    await newGig.save();
    res.status(201).json(newGig); // 201 Created ke liye zyada sahi hai
    
  } catch (error) {
    console.error("Create Gig Error:", error);
    res.status(500).json({ message: "Error creating gig", error: error.message }); // 'err' ko 'error' kiya
  }
};

export const getAllGigs = async (req, res) => {
  try {
    const { search } = req.query;
    let query = { status: 'open' };

    if (search) {
      query.title = { $regex: search, $options: 'i' }; 
    }

    // Populate se owner ka naam bhi dikhega frontend par
    const gigs = await Gig.find(query).populate('ownerId', 'name');
    res.status(200).json(gigs);

  } catch (error) {
    console.error("Fetch Gigs Error:", error);
    res.status(500).json({ message: "Error fetching gigs", error: error.message }); // 'err' ko 'error' kiya
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
    // ownerId wo hai jisne gig banayi (Client)
    const gigs = await Gig.find({ ownerId: req.user.id })
      .populate({
        path: 'bids', // Gig model mein jo 'bids' array hai
        populate: { 
          path: 'freelancerId', // Bid model mein jo 'freelancerId' hai
          select: 'name email'  // Sirf name aur email chahiye
        }
      });

    console.log("Gigs found with bids:", JSON.stringify(gigs, null, 2)); // Terminal check karne ke liye
    res.status(200).json(gigs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard data", error: error.message });
  }
};

// gig.controller.js mein niche ye add karein
import { Bid } from '../model/Bid.model.js'; // Bid model import karna mat bhoolna

export const hireFreelancer = async (req, res) => {
    // Session start karein transactional integrity ke liye
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { gigId, bidId } = req.body;

        // 1. Check karein ki gig abhi bhi 'open' hai ya nahi (Race Condition check)
        const gig = await Gig.findOne({ _id: gigId, status: 'open' }).session(session);
        
        if (!gig) {
            // Agar gig pehle hi kisi aur ne hire kar li hai (status open nahi hai)
            throw new Error("Gig is already assigned or closed.");
        }

        // 2. Gig status ko 'assigned' mark karein
        gig.status = 'assigned';
        await gig.save({ session });

        // 3. Chuni hui Bid ko 'accepted' mark karein
        await Bid.findByIdAndUpdate(bidId, { status: 'accepted' }, { session });

        // 4. Baaki saari bids ko 'rejected' mark karein
        await Bid.updateMany(
            { gigId: gigId, _id: { $ne: bidId } },
            { status: 'rejected' },
            { session }
        );

        // Sab sahi raha toh commit (save) karein
        await session.commitTransaction();
        session.endSession();

        res.status(200).json({ message: "Freelancer hired successfully!", gig });
    } catch (error) {
        // Agar kuch galat hua, toh saare changes cancel (Rollback) karein
        await session.abortTransaction();
        session.endSession();
        res.status(400).json({ message: "Hiring error", error: error.message });
    }
};