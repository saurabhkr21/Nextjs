//@ts-nocheck
"use client";
import { signUpHandler } from "@/action";
import { JobContext, useJobContext } from "@/context";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({});
    const router = useRouter();
    // const {name,setName}=useJobContext();
    

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
            const response = await signUpHandler(obj);
            if (!response?.success) {
                errorObj.message = response?.message;
                setError(errorObj);
            } else {
                setError({});
                router.push(response.redirect || "/");
            }
        }
        router.refresh();
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
                        Login
                    </h1>
                    <input
                        type="text"
                        placeholder="Username"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        autoComplete="username"
                    />
                    {error.name && (
                        <p className="text-red-500 text-sm">{error.name}</p>
                    )}
                    <input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        autoComplete="email"
                    />
                    {error.email && (
                        <p className="text-red-500 text-sm">{error.email}</p>
                    )}
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                        autoComplete="current-password"
                    />
                    {error.password && (
                        <p className="text-red-500 text-sm">{error.password}</p>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2 rounded transition mt-2"
                    >
                        Submit
                    </button>
                    {error.message && (
                        <p className="text-red-500 text-center text-sm">
                            {error.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
