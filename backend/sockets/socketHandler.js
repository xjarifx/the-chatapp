export const handleSocketEvents = (socket) => {
  console.log("New user: " + socket.id);

  socket.on("join_room", ({ user, room }) => {
    console.log(`${user.username} joined room ${room.name}`);
    socket.join(room.name);
  });

  socket.on("leave_room", ({ user, room }) => {
    console.log(`${user.username} left room ${room.name}`);
    socket.leave(room.name);
  });

  socket.on("send_message", ({ room, message }) => {
    console.log(`Message from ${message.user.username}: ${message.text}`);
    socket.to(room.name).emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log(socket.id + " disconnected");
  });
};
