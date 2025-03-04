import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

let io;
const userSocketMap = new Map(); // userId -> socketId

export const initSocket = (socketIO) => {
  io = socketIO;
  
  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    socket.on("setup", (userId) => {
      if (!userId) {
        console.log("Setup event received without userId");
        return;
      }
      
      // Remove any existing socket connections for this user
      for (const [existingUserId, existingSocketId] of userSocketMap.entries()) {
        if (existingUserId === userId) {
          userSocketMap.delete(existingUserId);
        }
      }

      userSocketMap.set(userId, socket.id);
      socket.userId = userId; // Store userId in socket object
      socket.join(userId);
      console.log("User connected:", userId);
      console.log("Current online users:", Array.from(userSocketMap.keys()));
      
      // Broadcast to all clients
      io.emit("onlineUsers", Array.from(userSocketMap.keys()));
    });

    socket.on("disconnect", () => {
      if (socket.userId) {
        userSocketMap.delete(socket.userId);
        console.log("User disconnected:", socket.userId);
        console.log("Remaining online users:", Array.from(userSocketMap.keys()));
        io.emit("onlineUsers", Array.from(userSocketMap.keys()));
      }
    });
  });
};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap.get(receiverId);
};

export const getIO = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

export const emitMessage = (receiverId, event, data) => {
  const io = getIO();
  const receiverSocketId = getReceiverSocketId(receiverId);
  
  if (receiverSocketId) {
    console.log(`Emitting ${event} to ${receiverId}`);
    io.to(receiverSocketId).emit(event, data);
  }
};

export default { io, server, app };
