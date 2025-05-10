import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user: " + socket.id);

  socket.on("join_room", ({ user, room }) => {
    console.log(`${user.username} joined room ${room.id}`);
    socket.join(room.id);
  });

  socket.on("leave_room", ({ user, room }) => {
    console.log(`${user.username} left room ${room.id}`);
    socket.leave(room.id);
  });

  socket.on("send_message", ({ room, message }) => {
    console.log(`Message from ${message.user.username}: ${message.text}`);
    socket.to(room.id).emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
});

server.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});
