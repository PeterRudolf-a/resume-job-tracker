import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const LoginRegister = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) navigate("/upload");
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const res = await axios.post(`http://localhost:5000${endpoint}`, {
        email,
        password,
      });
      login(res.data.token);
      navigate("/upload");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Authentication failed");
      } else {
        setError("Authentication failed");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow bg-white space-y-4">
      <h1 className="text-xl font-bold text-center">
        {isLogin ? "Login" : "Register"}
      </h1>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p
        className="text-sm text-center text-blue-600 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "Don't have an account? Register"
          : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default LoginRegister;
