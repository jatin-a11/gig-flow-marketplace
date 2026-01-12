import { Bid } from "../model/Bid.model.js";
import { Gig } from "../model/Gig.model.js";

export const createBid = async (req, res) => {
    try {
        const { message, price, gigId } = req.body;

        const gig = await Gig.findById(gigId);
        if (!gig) {
            return res.status(404).json({ message: "Gig nahi mili!" });
        }

        if (gig.ownerId.toString() === req.user.id) {
            return res.status(400).json({ message: "Aap apni hi gig par bid nahi kar sakte!" });
        }

        const newBid = new Bid({
            message,
            bidAmount: price,
            gigId,
            freelancerId: req.user.id,
            status: 'pending'
        });

        const savedBid = await newBid.save();

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