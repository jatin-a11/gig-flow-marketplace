import { Bid } from "../model/Bid.model.js";
import { Gig } from "../model/Gig.model.js";

export const createBid = async (req, res) => {
    try {
        const { message, price, gigId } = req.body;

        // 1. Pehle check karein ki kya freelancer khud ki gig par toh bid nahi kar raha?
        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({ message: "Gig nahi mili!" });
        }

        if (gig.ownerId.toString() === req.user.id) {
            return res.status(400).json({ message: "Aap apni hi gig par bid nahi kar sakte!" });
        }

        // 2. Bid create karein
        const newBid = new Bid({
            message,
            bidAmount: price,
            gigId,
            freelancerId: req.user.id,
            status: 'pending'
        });

        const savedBid = await newBid.save();

        // 3. 🔥 SABSE ZAROORI STEP: Gig ke 'bids' array mein is ID ko push karein
        // Iske bina Client ko dashboard par bids nahi dikhengi
        await Gig.findByIdAndUpdate(gigId, { 
            $push: { bids: savedBid._id } 
        });

        res.status(201).json({
            message: "Bid submitted and linked to gig successfully!",
            savedBid
        });
        
    } catch (error) {
        console.error("Bid Submission Error:", error);
        res.status(500).json({ message: "Bid fail ho gayi", error: error.message });
    }
};

// Freelancer ki apni bids dekhne ke liye
export const getFreelancerBids = async (req, res) => {
    try {
        const bids = await Bid.find({ freelancerId: req.user.id })
            .populate('gigId', 'title budget status description')
            .sort({ createdAt: -1 });
        res.status(200).json(bids);
    } catch (error) {
        res.status(500).json({ message: "Bids fetch error", error: error.message });
    }
};