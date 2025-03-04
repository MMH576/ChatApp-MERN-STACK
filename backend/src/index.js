import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config();

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true,
  })
);

const port = process.env.PORT || 5001;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});

