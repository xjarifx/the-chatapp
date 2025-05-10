import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Room({ user, setRoom, setUser }) {
  const [roomName, setRoomName] = useState("");
  const [createRoomId, setCreateRoomId] = useState(""); // for Create Room
  const [joinRoomId, setJoinRoomId] = useState(""); // for Join Room
  const navigate = useNavigate();

  const handleCreate = () => {
    if (roomName && createRoomId) {
      setRoom({ name: roomName, id: createRoomId });
      navigate("/chat");
    } else {
      alert("Please fill in both Room Name and Room ID.");
    }
  };

  const handleJoin = () => {
    if (joinRoomId) {
      setRoom({ name: "Joined Room", id: joinRoomId });
      navigate("/chat");
    } else {
      alert("Please enter a Room ID.");
    }
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

        {/* Create Room */}
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">Create Room</h3>
          <input
            type="text"
            placeholder="Room Name"
            className="input input-bordered mb-2 w-full"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID"
            className="input input-bordered mb-2 w-full"
            value={createRoomId}
            onChange={(e) => setCreateRoomId(e.target.value)}
          />
          <button className="btn btn-success w-full" onClick={handleCreate}>
            Create Room
          </button>
        </div>

        {/* Join Room */}
        <div className="mb-4">
          <h3 className="mb-2 text-lg font-semibold">Join Room</h3>
          <input
            type="text"
            placeholder="Room ID"
            className="input input-bordered mb-2 w-full"
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
          />
          <button className="btn btn-primary w-full" onClick={handleJoin}>
            Join Room
          </button>
        </div>

        <button className="btn btn-error mt-4 w-full" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
