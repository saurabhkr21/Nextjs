"use client";
import React, { useState } from "react";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const user = {
      email,
      password: pass,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Signup successful!");
        setEmail("");
        setPass("");
      } else {
        setMessage(data.message || "Signup failed.");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}
