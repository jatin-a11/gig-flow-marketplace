export const hireFreelancer = async (req, res) => {
  try {
    const { gigId, bidId } = req.body;

    const gig = await Gig.findById(gigId);
    if (!gig) return res.status(404).json({ message: "Gig nahi mili!" });

    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Aap dusre ki gig par kisi ko hire nahi kar sakte!" });
    }

    // Status Updates
    await gig.findByIdAndUpdate(gigId, { status: 'assigned' });
    await Bid.findByIdAndUpdate(bidId, { status: 'accepted' });
    
    await Bid.updateMany(
      { gigId, _id: { $ne: bidId } }, 
      { status: 'rejected' }
    );

    res.status(200).json({ message: "Freelancer hired successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Hiring failed", error: error.message });
  }
};