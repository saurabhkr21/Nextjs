"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    message?: string;
  }>({});
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errorObj: { email?: string; password?: string; message?: string } =
      {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errorObj.email = "Please enter a valid email address.";
    }
    if (password.length < 8) {
      errorObj.password = "Password should be at least 8 characters long";
    }

    if (errorObj.email || errorObj.password) {
      setError(errorObj);
      return;
    }
    setError({});
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Login successful!");
        router.push("/");
      } else {
        setError({ message: data.message });
      }
    } catch (error) {
      setError({ message: "Login failed. Please try again." });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex items-center justify-center mb-10 text-4xl font-bold italic text-blue-600 dark:text-blue-400">
        <h1>
          Welcome to <b className="text-amber-700 dark:text-amber-500">Job</b>{" "}
          Portal
        </h1>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
            Login
          </h1>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoComplete="email"
          />
          {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoComplete="current-password"
          />
          {error.password && (
            <p className="text-red-500 text-sm">{error.password}</p>
          )}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded transition mt-2 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Submit
          </button>
          {error.message && (
            <p className="text-red-500 text-center text-sm">{error.message}</p>
          )}
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
