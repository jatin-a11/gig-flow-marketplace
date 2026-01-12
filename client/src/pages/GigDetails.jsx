import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const GigDetails = () => {
    const { id } = useParams(); // URL se Gig ID nikalne ke liye
    const navigate = useNavigate();
    const [gig, setGig] = useState(null);
    const [bidData, setBidData] = useState({ price: '', message: '' });
    const [loading, setLoading] = useState(true);

    // Gig ka data fetch karne ke liye
    useEffect(() => {
        const fetchGig = async () => {
            try {
                // api instance use karein taaki baseURL (http://localhost:5008/api) use ho sake
                const res = await API.get(`/gigs/${id}`); 
                setGig(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching gig:", err);
                setLoading(false);
            }
        };
        fetchGig();
    }, [id]);

    // Bid submit karne ka function
    const handleBidSubmit = async (e) => {
        e.preventDefault();
        try {
            // Frontend se 'price' bhej rahe hain, jo Backend mein 'bidAmount' ban jayega
            await API.post('/bids', {
                price: Number(bidData.price), // Number mein convert karna safe hai
                message: bidData.message,
                gigId: id // Ye URL wala id hai jo backend ko zaroori chahiye
            });
            
            alert("Bid submitted successfully!");
            navigate('/'); // Success ke baad home par bhej do
        } catch (err) {
            // Agar error aaye toh console mein check karein
            console.error("Bid submission error:", err.response?.data);
            alert(err.response?.data?.message || "Bid failed. Please check if you are logged in.");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
            <div className="text-xl animate-pulse">Loading Gig Details...</div>
        </div>
    );

    if (!gig) return <div className="text-center text-white mt-10">Gig not found!</div>;

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-900 shadow-2xl mt-10 rounded-xl text-white border border-gray-800">
            {/* Gig Info Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-blue-400 mb-2 capitalize">{gig.title}</h1>
                <div className="flex items-center gap-4 text-gray-400 text-sm">
                    <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full font-semibold">
                        Budget: ₹{gig.budget}
                    </span>
                    <span className="bg-green-900 text-green-200 px-3 py-1 rounded-full font-semibold">
                        Status: {gig.status}
                    </span>
                </div>
            </div>
            
            <div className="border-t border-gray-800 pt-6 mb-10">
                <h3 className="text-2xl font-bold mb-3 text-gray-200">Job Description</h3>
                <p className="text-gray-400 leading-relaxed text-lg italic">
                    "{gig.description}"
                </p>
            </div>

            {/* Bid Form Section */}
            <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-inner">
                <h3 className="text-2xl font-bold mb-6 text-blue-400 border-b border-gray-700 pb-2">
                    Submit Your Proposal
                </h3>
                <form onSubmit={handleBidSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Your Asking Price (₹)
                        </label>
                        <input 
                            type="number" 
                            required
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                            value={bidData.price}
                            onChange={(e) => setBidData({ ...bidData, price: e.target.value })}
                            placeholder="e.g. 500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                            Why should the client hire you?
                        </label>
                        <textarea 
                            required
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                            rows="5"
                            value={bidData.message}
                            onChange={(e) => setBidData({ ...bidData, message: e.target.value })}
                            placeholder="Explain your experience and approach..."
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold text-lg shadow-lg transform transition active:scale-95"
                    >
                        Send Proposal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GigDetails;