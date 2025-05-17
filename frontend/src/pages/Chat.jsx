import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

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
      console.log("Received message:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = { user: user.username, text: message };
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
        </div>
        <button className="btn btn-error btn-sm" onClick={leaveRoom}>
          Leave Room
        </button>
      </div>

      {/* Chat Messages */}
      <div className="mb-4 flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full ${msg.user === user.username ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-2 ${
                msg.user === user.username
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 text-base-content"
              }`}
            >
              <div className="mb-1 text-sm font-bold">
                {/* {msg.user === user.username ? "You" : msg.user} */}
                {/* {msg.user} */}
                {msg.user === user.username ? `${msg.user} (You)` : msg.user}
              </div>
              <div>{msg.text}</div> {/* Display the message itself */}
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
