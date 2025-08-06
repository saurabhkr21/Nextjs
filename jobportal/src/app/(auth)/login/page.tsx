//@ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const router = useRouter();
  // const {name,setName}=useJobContext();

  const handleLogin = async () => {
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
        // Set token in cookie for client-side
        document.cookie = `token=${data.data.token}; path=/; max-age=3600`;
        router.push("/");
        router.refresh();
      } else {
        setError({ message: data.message });
      }
    } catch (error) {
      setError({ message: "Login failed. Please try again." });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const errorObj = {};
    if (name.length < 3) {
      errorObj.name = "Name should be at least 3 characters long";
    }
    if (email.length < 5) {
      errorObj.email = "Email should be at least 5 characters long";
    }
    if (password.length < 8) {
      errorObj.password = "Password should be at least 8 characters long";
    }
    if (errorObj.name || errorObj.email || errorObj.password) {
      setError(errorObj);
    } else {
      const obj = { name, email, password };
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify(obj),
      });
      console.log(res);
      if (res.redirected) {
        window.location.href = res.url;
      } else {
        setError({});
        router.push(res.redirect || "/");
      }
    }
    router.refresh();
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
            type="text"
            placeholder="Username"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoComplete="username"
          />
          {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
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
      </div>
    </div>
  );
}
