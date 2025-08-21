'use client'

import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.status) {
        window.location.href = data.dashboard_url; // 登入成功跳轉
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Login Page</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2 w-64">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="login-button bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>

      <p className="mt-2">
        Don&apos;t have an account? <a href="/register" className="text-blue-500 hover:underline">Register here</a>
      </p>
      <p>
        <a href="/" className="text-blue-500 hover:underline">Back to Home</a>
      </p>
    </div>
  );
}
