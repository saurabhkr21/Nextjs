"use client";
import gqlClient from "@/services/gql";
import { gql } from "graphql-request";
import { LockIcon, MailIcon, PenLineIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{
    email?: string;
    password?: string;
    message?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
      return;
    }

    setError({});

    try{
      const data: any = await gqlClient.request(LOGIN_USER, {
        email,
        password
      });
      if(data.loginUser) {
        router.push("/");
        router.refresh();
      } else {
        setError({ message: data.message });
      }
    }catch (error) {
      setError({ message: "Login failed. Please try again." });
    }
    setLoading(false);
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md dark:bg-slate-800 dark:text-white border border-gray-200 dark:border-slate-700">
        <div className="flex flex-col items-center mb-8">
          <PenLineIcon className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-2" />
          <h2 className="text-3xl font-extrabold text-blue-700 dark:text-blue-400 text-center tracking-tight">
            Login to Blog Writer
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-2 text-center">
            Welcome back! Write, share, and inspire.
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
                  error.email ? "border-red-500" : ""
                }`}
              />
              <MailIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {error.email && (
              <p className="text-xs text-red-500 mt-1">{error.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
                  error.password ? "border-red-500" : ""
                }`}
              />
              <LockIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {error.password && (
              <p className="text-xs text-red-500 mt-1">{error.password}</p>
            )}
          </div>

          {/* Error Message */}
          {error.message && (
            <div className="text-center text-red-600 text-sm font-medium mb-2">
              {error.message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-60"
            disabled={loading}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            )}
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 dark:text-white mt-6 text-center">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
