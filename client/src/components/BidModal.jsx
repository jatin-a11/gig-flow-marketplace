import { useState } from 'react';
import API from '../api/axios';
import { X } from 'lucide-react';

const BidModal = ({ gigId, onClose }) => {
    const [bidData, setBidData] = useState({ message: '', bidAmount: '' });

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/bids', { ...bidData, gigId });
            alert("Bid submitted successfully!");
            onClose(); // Modal band kar do
        } catch (err) {
            alert("Error: " + err.response?.data?.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black">
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4">Place Your Bid</h2>
                <form onSubmit={handleBidSubmit} className="space-y-4">
                    <textarea 
                        placeholder="Why should we hire you?"
                        className="w-full p-3 border rounded-lg h-24 outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setBidData({...bidData, message: e.target.value})}
                        required
                    />
                    <input 
                        type="number" placeholder="Bid Amount (₹)"
                        className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={(e) => setBidData({...bidData, bidAmount: e.target.value})}
                        required
                    />
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                        Submit Bid
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BidModal;