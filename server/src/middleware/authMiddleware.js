import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    try {
        // Safe check: pehle dekhein req.cookies exist karta hai ya nahi
        const token = req.cookies ? req.cookies.token : null;

        if (!token) {
            // Agar token nahi hai, toh 401 bhejien, crash na karein
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Auth error:", err.message);
        res.status(401).json({ message: "Token is not valid" });
    }
};