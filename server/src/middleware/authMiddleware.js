import jwt from 'jsonwebtoken';

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies ? req.cookies.token : null;

        if (!token) {
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