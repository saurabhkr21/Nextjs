"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    name?: string;
    email?: string;
    password?: string;
    message?: string;
  }>({});
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errorObj: {
      name?: string;
      email?: string;
      password?: string;
      message?: string;
    } = {};
    if (!name.trim()) {
      errorObj.name = "Please enter your name.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorObj.email = "Please enter a valid email address.";
    }
    if (password.length < 8) {
      errorObj.password = "Password should be at least 8 characters long";
    }

    if (errorObj.name || errorObj.email || errorObj.password) {
      setError(errorObj);
      return;
    }

    setError({});

    const user = {
      name,
      email,
      password,
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
        router.push("/login");
      } else {
        setError({ message: data.message || "Signup failed." });
      }
    } catch (err) {
      setError({ message: "Network error. Please try again." });
    }
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-between min-h-screen ">
      <div className="flex flex-col gap-4 mt-4 items-center">
        <Link href={`/`}>
          <h1 className="text-2xl">ECOCart.in</h1>
        </Link>
        <form
          className="border gap-3 p-2 rounded flex flex-col  shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="font-medium">Create your account</h2>
          <div className="flex flex-col">
            <label htmlFor="name" className="font font-bold">
              Enter name
            </label>
            <input
              type="text"
              className="border p-1 rounded "
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
            <label htmlFor="email" className="font font-bold">
              Enter email
            </label>
            <input
              type="email"
              className="border p-1 rounded  dark:border-gray-600 dark:text-white"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {error.email && (
              <p className="text-red-500 text-sm">{error.email}</p>
            )}
            <label htmlFor="password" className="font font-bold">
              Enter Password
            </label>
            <input
              type="password"
              className="border p-1 rounded  dark:border-gray-600 "
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-amber-300 rounded-2xl p-1 font-semibold mt-2"
          >
            Sign Up
          </button>
          {error.message && (
            <p className="text-red-500 text-center text-sm">{error.message}</p>
          )}
          <p className="text-sm flex flex-wrap border-b-1">
            By continuing, you agree to ECOCart's
            <span>Conditions of Use</span> and
            <span>Privacy Notice.</span>
          </p>
          <div className="flex flex-col">
            <span className="font-semibold">Buying for work?</span>
            <span className="opacity-70">Create a free business account</span>
          </div>
        </form>
      </div>
      <footer>
        <p>
          <span>Condition of Use</span>
          <span>Privacy Notice</span>
          <span>Help</span>
        </p>
        <p>&#169; 2025-present,ECOCart.com,Inc. or its affiliates </p>
      </footer>
    </div>
  );
}
