import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Logout handler
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // 1. Agar user logged in nahi hai (Public Navbar)
    if (!user) {
        return (
            <nav className="bg-white shadow-md p-4 flex justify-between items-center px-10">
                <Link to="/" className="text-2xl font-bold text-blue-600">GigFlow</Link>
                <div className="flex gap-6">
                    <Link to="/login" className="hover:text-blue-500 font-medium pt-2">Login</Link>
                    <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Join</Link>
                </div>
            </nav>
        );
    }

    // 2. Agar user logged in hai (Protected Navbar)
    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center px-10">
            <Link to="/" className="text-2xl font-bold text-blue-600">GigFlow</Link>
            
            <div className="flex gap-6 items-center">
                {/* Sabhi ko dikhne wala link */}
                <Link to="/" className="hover:text-blue-500 font-medium text-gray-700">Browse Jobs</Link>
                
                {/* ---  CLIENT ONLY LINKS --- */}
                {user.role === 'client' && (
                    <>
                        <Link 
                            to="/dashboard" 
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            My Gigs Dashboard
                        </Link>
                        <Link to="/post-gig" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition shadow-sm">
                            Post a Gig
                        </Link>
                    </>
                )}

                {/* ---  FREELANCER ONLY LINKS --- */}
                {user.role === 'freelancer' && (
                    <Link 
                        to="/my-bids" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition shadow-sm"
                    >
                        My Applied Bids
                    </Link>
                )}

                {/* --- USER PROFILE & LOGOUT --- */}
                <div className="flex items-center gap-4 ml-4 border-l pl-4">
                    <div className="text-right">
                        <p className="text-gray-800 text-sm font-bold leading-tight">
                            {user.name || 'User'}
                        </p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">
                            {user.role}
                        </p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="text-red-500 font-bold hover:text-red-700 text-sm transition hover:underline"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;