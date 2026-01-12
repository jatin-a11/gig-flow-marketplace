import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/'); // Login ke baad home page par bhej dega
        } catch (err) {
            alert("Login Failed: " + err.response?.data?.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-8 bg-white shadow-lg rounded-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login to GigFlow</h2>
                <input 
                    type="email" placeholder="Email" 
                    className="w-full p-3 mb-4 border rounded focus:outline-blue-500"
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <input 
                    type="password" placeholder="Password" 
                    className="w-full p-3 mb-6 border rounded focus:outline-blue-500"
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
                <button className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition">
                    Login
                </button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span>
                </p>
            </form>
        </div>
    );
};

export default Login;