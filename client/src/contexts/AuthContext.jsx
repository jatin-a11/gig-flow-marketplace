import { createContext, useState, useEffect, useContext } from 'react';
import API from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Page refresh hone par check karega ki user logged-in hai ya nahi
    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            
            // Agar token hi nahi hai, toh direct loading false kar do
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await API.get('/auth/me'); 
                // Note: Aapke getMe controller ke hisaab se check karein ki data.user hai ya sirf data
                setUser(data.user || data); 
            } catch (err) {
                console.error("Refresh auth error:", err);
                localStorage.removeItem('token'); // Invalid token ko hata dein
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkLoggedIn();
    }, []);

    // --- LOGIN UPDATE ---
    const login = async (email, password) => {
        try {
            const { data } = await API.post('/auth/login', { email, password });
            
            // Token ko local storage mein save karein taaki refresh par kaam aaye
            if (data.token) {
                localStorage.setItem('token', data.token); 
            }
            
            setUser(data.user);
            return data; 
        } catch (err) {
            throw err;
        }
    };

    // --- LOGOUT UPDATE ---
    const logout = async () => {
        try {
            await API.post('/auth/logout');
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            // Token aur user state clear karein
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);