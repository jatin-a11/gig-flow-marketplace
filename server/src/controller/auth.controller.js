import { User } from '../model/User.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body; // Role bhi add kiya

    // 1. Check karein user pehle se hai ya nahi
    const existingUser = await User.findOne({ email }); // await lagana zaroori hai
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. Password Hash karein
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // 3. Naya User banayein (Note: 'const' lagaya kyunki 'user' redeclare ho raha tha)
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'freelancer' // Role default freelancer
    });

    await newUser.save();
    res.status(201).json({ message: "User registered Successfully" });

  } catch (error) {
    console.error("Register failed:", error);
    res.status(500).json({ message: "Server error", error: error.message }); // 'err' ko 'error' kiya
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body; 

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Token generate ho raha hai
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // 1. Agar aap Cookies use kar rahe hain toh ye sahi hai
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    // 2. Yahan badlav karein (Token ko JSON mein bhi bhejein)
    res.status(200).json({ 
      message: "Login Successfully",
      token, // <--- Frontend ko token milna chahiye taaki wo save kar sake
      user: { id: user._id, name: user.name, role: user.role } 
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // AuthContext ke 'data.user' format se match karne ke liye:
    res.json({ user }); 
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};