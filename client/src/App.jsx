import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';
import Login from '../src/pages/Login';
import Signup from '../src/pages/Signup';
import Home from '../src/pages/Home';
import PostGig from '../src/pages/PostGig';
import Navbar from '../src/components/Navbar';
import ClientDashboard from "../src/pages/ClientDashboard";
import GigDetails from "../src/pages/GigDetails";
import FreelancerBids from '../src/pages/FreelancerBids'; 

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div className="flex justify-center mt-20">Loading...</div>;
    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <Routes>
          
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        <Route path="/" element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="/post-gig" element={
                            <ProtectedRoute>
                                <PostGig />
                            </ProtectedRoute>
                        } />

                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <ClientDashboard />
                            </ProtectedRoute>
                        } />

                        <Route path="/my-bids" element={
                            <ProtectedRoute>
                                <FreelancerBids />
                            </ProtectedRoute>
                        } />

                        <Route path="/gig/:id" element={
                            <ProtectedRoute>
                                <GigDetails />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;