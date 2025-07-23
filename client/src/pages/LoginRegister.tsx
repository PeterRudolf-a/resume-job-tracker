import { useState } from "react";
import axios from "axios";

const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";

    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/${endpoint}`,
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Error");
      } else {
        alert("Error");
      }
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">
        {isLogin ? "Login" : "Register"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="w-full text-sm text-gray-500 underline"
        >
          {isLogin ? "Need to register?" : "Already have an account?"}
        </button>
      </form>

      {token && (
        <div className="mt-6 text-green-600 font-mono text-sm break-all">
          Logged in with token: {token.slice(0, 24)}...
        </div>
      )}
    </div>
  );
};

export default LoginRegister;
