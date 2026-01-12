import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'freelancer' // Default role
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/auth/register', formData);
            alert("Registration successful! Please login.");
            navigate('/login');
        } catch (err) {
            alert("Signup Failed: " + err.response?.data?.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-xl rounded-2xl w-full max-w-md">
                <div className="flex justify-center mb-4 text-blue-600">
                    <UserPlus size={40} />
                </div>
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create your Account</h2>
                
                <div className="space-y-4">
                    <input 
                        type="text" placeholder="Full Name" 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required 
                    />
                    <input 
                        type="email" placeholder="Email Address" 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                    />
                    <input 
                        type="password" placeholder="Password" 
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required 
                    />
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">I want to:</label>
                        <select 
                            className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                        >
                            <option value="freelancer">Work as a Freelancer</option>
                            <option value="client">Hire Freelancers</option>
                        </select>
                    </div>

                    <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg">
                        Sign Up
                    </button>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <span className="text-blue-500 font-semibold cursor-pointer" onClick={() => navigate('/login')}>Login</span>
                </p>
            </form>
        </div>
    );
};

export default Signup;