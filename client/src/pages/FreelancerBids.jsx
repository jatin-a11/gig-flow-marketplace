import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const FreelancerBids = () => {
    const [myBids, setMyBids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyBids = async () => {
            try {
                // Backend route: /bids/my-bids
                const res = await API.get('/bids/my-bids');
                setMyBids(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Bids fetch error:", err);
                setLoading(false);
            }
        };
        fetchMyBids();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading your applications...</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">My Applications</h1>

            {myBids.length === 0 ? (
                <div className="bg-gray-100 p-10 rounded-lg text-center">
                    <p className="text-gray-600 italic text-lg">Aapne abhi tak koi bid nahi lagayi hai.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {myBids.map((bid) => (
                        <div key={bid._id} className="bg-white border rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-800">
                                    {bid.gigId?.title || "Gig Details Unavailable"}
                                </h2>
                                <p className="text-gray-500 text-sm mt-1 italic">
                                    "Your Proposal: {bid.message}"
                                </p>
                                
                                {/* 🟢 Accepted Status Message */}
                                {bid.status === 'accepted' && (
                                    <div className="mt-3 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold animate-bounce">
                                        🎉 Congrats! You are hired for this gig.
                                    </div>
                                )}
                            </div>

                            <div className="text-right">
                                <p className="text-2xl font-bold text-blue-600">₹{bid.bidAmount}</p>
                                <span className={`mt-2 inline-block px-4 py-1 rounded-full text-xs font-bold uppercase ${
                                    bid.status === 'accepted' ? 'bg-green-600 text-white' : 
                                    bid.status === 'rejected' ? 'bg-red-500 text-white' : 
                                    'bg-yellow-500 text-white'
                                }`}>
                                    {bid.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FreelancerBids;