import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const ClientDashboard = () => {
    const [myGigs, setMyGigs] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            const res = await API.get('/gigs/my-gigs'); 
            console.log("BACKEND DATA CHECK:", res.data);
            setMyGigs(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Dashboard error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const handleHire = async (gigId, bidId) => {
        if (!window.confirm("Kya aap is freelancer ko hire karna chahte hain?")) return;

        try {
            await API.patch('/gigs/hire', { gigId, bidId });
            alert("Freelancer hired successfully!");
            
            fetchDashboardData(); 
        } catch (err) {
            console.error("Hiring error:", err);
            alert(err.response?.data?.message || "Hiring process failed.");
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="text-white text-xl animate-pulse">Loading Dashboard...</div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto p-6 text-white bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-blue-400">My Posted Gigs</h1>

            {myGigs.length === 0 ? (
                <p className="text-gray-400">Aapne abhi tak koi gig post nahi ki hai.</p>
            ) : (
                <div className="space-y-6">
                {myGigs.map((gig) => (
                 <div key={gig._id} className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-lg">
                <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
                <div>
               <h2 className="text-2xl font-semibold text-white capitalize">{gig.title}</h2>
            <p className="text-sm text-gray-400 mt-1">
              Budget: ₹{gig.budget} | 
              Status: <span className={`font-bold ${gig.status === 'open' ? 'text-green-400' : 'text-yellow-400'}`}>
                {gig.status.toUpperCase()}
                  </span>
                  </p>
                  </div>
             <div className="bg-blue-600 px-4 py-1 rounded-full text-xs font-bold uppercase">
              {gig.bids.length} Proposals
                </div>
               </div>

              {/* Bids List */}
              <div className="mt-4">
             <h3 className="text-lg font-medium mb-3 text-gray-300">Received Bids:</h3>
          {gig.bids.length > 0 ? (
             <div className="grid gap-4">
             {gig.bids.map((bid) => (
            <div key={bid._id} className={`p-4 rounded-md border-l-4 transition-all ${bid.status === 'accepted' ? 'bg-blue-900/30 border-blue-500' : 'bg-gray-700/50 border-gray-600'}`}>
              <div className="flex justify-between items-start">
                 <div className="flex-1">
                   <p className="font-bold text-blue-300 text-lg">
                     {bid.freelancerId?.name || "Freelancer"}
                      {bid.status === 'accepted' && <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full">HIRED</span>}
                      </p>
                    <p className="text-gray-300 mt-1 text-sm italic">"{bid.message}"</p>
                 </div>
                                                    
        <div className="text-right ml-4">
           <p className="text-xl font-bold text-green-400">₹{bid.bidAmount}</p>
            {gig.status === 'open' ? (
             <button 
               onClick={() => handleHire(gig._id, bid._id)}
               className="mt-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold px-4 py-2 rounded shadow-md transform active:scale-95 transition"
                 >
                   Hire Now
                   </button>
                    ) : (
                    <div className="mt-2 text-xs font-semibold">
                    {bid.status === 'accepted' ? (
                    <span className="text-blue-400">✅ Project Assigned</span>
                       ) : (
                      <span className="text-gray-500 italic">Position Filled</span>
                       )}
                         </div>
                       )}
                        </div>
                         </div>
                          </div>
                           ))}
                              </div>
                         ) : (
                     <p className="text-gray-500 text-sm italic">Abhi tak kisi ne bid nahi lagayi hai.</p>
                         )}
                       </div>
                     </div>
                   ))}
                 </div>
               )}
        </div>
    );
};

export default ClientDashboard;