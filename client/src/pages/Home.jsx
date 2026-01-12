import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link import karna zaroori hai
import API from '../api/axios';
import { Search, Briefcase } from 'lucide-react';

const Home = () => {
    const [gigs, setGigs] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchGigs = async () => {
        try {
            setLoading(true);
            const { data } = await API.get(`/gigs?search=${search}`);
            setGigs(data);
        } catch (err) {
            console.error("Error fetching gigs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchGigs();
        }, 500);
        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                <h1 className="text-3xl font-extrabold text-gray-800">Explore Available Gigs</h1>
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search for jobs (e.g. React Developer)..."
                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-full focus:border-blue-500 outline-none transition"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center text-xl text-gray-500 mt-20">Searching for gigs...</div>
            ) : gigs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gigs.map((gig) => (
                        <div key={gig._id} className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition">
                            <div className="flex items-center gap-2 mb-3">
                                <Briefcase className="text-blue-500" size={18} />
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                                    {gig.status}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">{gig.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{gig.description}</p>
                            
                            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                                <span className="text-lg font-bold text-green-600">₹{gig.budget}</span>
                                
                                {/* YAHAN IMPLEMENT KIYA GAYA HAI */}
                                <Link 
                                    to={`/gig/${gig._id}`} 
                                    className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 transition text-center"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center mt-20">
                    <p className="text-gray-500 text-lg">No gigs found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Home;