"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    if (isLogin) {
      // LOGIN
      const userExists = users.find(
        (user: any) =>
          user.username === username && user.password === password
      );

      if (userExists) {
        localStorage.setItem("currentUser", username);
        router.push("/dashboard");
      } else {
        setError("Invalid username or password");
      }
    } else {
      // SIGNUP
      const userAlreadyExists = users.find(
        (user: any) => user.username === username
      );

      if (userAlreadyExists) {
        setError("User already exists");
        return;
      }

      const newUsers = [...users, { username, password }];
      localStorage.setItem("users", JSON.stringify(newUsers));
      localStorage.setItem("currentUser", username);
      router.push("/dashboard");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('/images/IMG_4224.WEBP')" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white w-full max-w-md"
      >
        <h1 className="text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4">
          CodePulse
        </h1>

        <p className="text-gray-400 mb-8">
          {isLogin ? "Login to continue" : "Create your account"}
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg space-y-4"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:border-purple-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-black/40 border border-gray-600 focus:outline-none focus:border-purple-500"
            required
          />

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105 transition-transform font-semibold"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p
            className="text-sm text-gray-400 cursor-pointer hover:text-white transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "New User? Create Account"
              : "Already have an account? Login"}
          </p>
        </form>
      </motion.div>
    </div>
  );
}