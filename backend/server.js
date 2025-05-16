import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import connectDB from "./db.js";
import userRoutes from "./routes/user.route.js";
import roomRoutes from "./routes/room.route.js";
import { handleSocketEvents } from "./sockets/socketHandler.js";

const app = express();
const server = createServer(app);
const PORT = process.env.PORT;
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// db con
await connectDB();

app.use(express.json());

// routes
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);

io.on("connection", handleSocketEvents);

server.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
