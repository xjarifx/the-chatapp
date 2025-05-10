import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

export default function Chat({ user, room, setRoom }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && room) {
      socket.emit("join_room", { user, room });
      console.log(`${user.username} joined room: ${room.name}`);
    }

    return () => {
      socket.emit("leave_room", { user, room });
      console.log(`${user.username} left room: ${room.name}`);
    };
  }, [user, room]);

  useEffect(() => {
    socket.on("receive_message", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = { user: user.username, text: message }; // 👈 just send username
      socket.emit("send_message", { room, message: newMessage });
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  const leaveRoom = () => {
    setRoom(null);
    navigate("/room");
  };

  return (
    <div className="bg-base-100 flex h-screen flex-col p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b pb-3">
        <div>
          <h2 className="text-xl font-bold">{room.name}</h2>
          <p className="text-sm text-gray-500">Room ID: {room.id}</p>
        </div>
        <button className="btn btn-error btn-sm" onClick={leaveRoom}>
          Leave Room
        </button>
      </div>

      {/* Chat Messages */}
      <div className="mb-4 flex-1 space-y-3 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat ${msg.user === user.username ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-bubble">
              <strong>{msg.user}</strong>: {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
