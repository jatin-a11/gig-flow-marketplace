import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

const PostGig = () => {
    const [formData, setFormData] = useState({ title: '', description: '', budget: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/gigs', formData);
            alert("Gig posted successfully!");
            navigate('/'); // Home par wapas bhej do
        } catch (err) {
            alert("Error posting gig: " + err.response?.data?.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                    <PlusCircle className="text-blue-600" />
                    <h2 className="text-2xl font-bold text-gray-800">Post a New Job</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                        <input 
                            type="text" placeholder="e.g. Build a Landing Page"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea 
                            placeholder="Describe the requirements..."
                            className="w-full p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹)</label>
                        <input 
                            type="number" placeholder="5000"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setFormData({...formData, budget: e.target.value})}
                            required
                        />
                    </div>

                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                        Create Gig
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostGig;