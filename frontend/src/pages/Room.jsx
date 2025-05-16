import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Room({ user, setRoom, setUser }) {
  const [roomInput, setRoomInput] = useState("");
  const navigate = useNavigate();


  // Smart join or create room
  const handleSmartRoom = () => {
    const normalizedRoom = roomInput.trim().toLowerCase();
    // Here you would call your backend to join or create the room.
    // For now, just set the room and navigate.
    setRoom({ name: normalizedRoom });
    navigate("/chat");
  };

  const handleLogout = () => {
    setUser(null);
    setRoom(null);
    navigate("/auth");
  };

  return (
    <div className="bg-base-200 flex h-screen items-center justify-center">
      <div className="card bg-base-100 w-full max-w-lg p-6 shadow-xl">
        <h2 className="mb-4 text-center text-2xl font-bold">
          Welcome, {user.username}
        </h2>

        {/* Smart Join/Create Room */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Join or Create Room</h3>
          <input
            type="text"
            placeholder="Room Name"
            className="input input-bordered mb-2 w-full"
            value={roomInput}
            onChange={(e) => setRoomInput(e.target.value)}
          />
          <button className="btn btn-primary w-full" onClick={handleSmartRoom}>
            Join or Create Room
          </button>
        </div>

        <button className="btn btn-error mt-4 w-full" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
