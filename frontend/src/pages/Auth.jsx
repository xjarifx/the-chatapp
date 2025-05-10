import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth({ setUser }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAuth = () => {
    if (username && password) {
      setUser({ username }); // TODO: connect to backend
      navigate("/room");
    } else {
      alert("Please fill all fields.");
    }
  };

  return (
    <div className="bg-base-200 flex h-screen items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h2>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="card-actions mt-4 flex-col">
            <button className="btn btn-primary w-full" onClick={handleAuth}>
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
            <button
              className="btn btn-link p-0"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Already have an account?" : "Create an account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
