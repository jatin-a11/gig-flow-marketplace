import express from "express";
import http from "http"; 
import { Server } from "socket.io";
import cors from "cors";
import cookieParser from "cookie-parser"; 
import dotenv from "dotenv";
import { connectDB } from "./dbConfig/db.js"; 

// Saare Routes Import Karein (Extension .js zaroori hai)
import authRoutes from "./routes/auth.route.js"; 
import gigRoutes from "./routes/gigs.route.js"; // Naya add karein
import bidRoutes from "./routes/bid.route.js";   // Naya add karein
import hireRoutes from "./routes/hire.route.js";

dotenv.config();

const app = express();
const server = http.createServer(app); 

connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Route Handlers
app.use("/api/auth", authRoutes); 
app.use("/api/gigs", gigRoutes); // Ab 404 nahi aayega gigs par
app.use("/api/bids", bidRoutes); // Ab bids ke liye rasta khul gaya
app.use("/api/hire", hireRoutes);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  socket.on("join_room", (userId) => {
    socket.join(userId);
  });
});

const PORT = process.env.PORT || 5008;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { io };