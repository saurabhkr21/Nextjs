"use client";
import { LOGIN_USER } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { Button, Card, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import { useState } from "react";

export default function page() {
  const [userCred, setUserCred] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<{ message?: string }>({});
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError({});
    setLoading(true);

    try {
      const data: {
        loginUser: boolean;
      } = await gqlClient.request(LOGIN_USER, {
        userCred,
        password,
      });

      if (data.loginUser) {
        window.location.href = "/";
      } else {
        setError({ message: "Invalid credentials" });
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <Card className="flex flex-col items-center gap-6 p-8 rounded-2xl shadow-2xl w-full max-w-md dark:bg-slate-800 dark:text-white border border-gray-200 dark:border-slate-700">
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg mb-2">
              <Image
                fill
                src="https://cdn-icons-png.flaticon.com/512/12474/12474329.png"
                alt="Logo"
                sizes="64px"
                // className="object-cover"
              />
            </div>
            <Text
              as="div"
              size="5"
              weight="bold"
              className="text-blue-700 dark:text-blue-400 text-center"
            >
              Login
            </Text>
            <Text
              as="div"
              size="2"
              className="text-gray-500 dark:text-gray-300 mt-1 text-center"
            >
              Welcome back! Please enter your credentials.
            </Text>
          </div>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <TextField.Root
              className="w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
              placeholder="Username or email"
              value={userCred}
              onChange={(e) => setUserCred(e.target.value)}
              disabled={loading}
            />
            <TextField.Root
              type="password"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            {error.message && (
              <Text className="text-red-500 text-center text-sm font-medium mb-2">
                {error.message}
              </Text>
            )}
            <Button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
              type="submit"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
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
              ) : null}
              <Text>{loading ? "Logging In..." : "Log In"}</Text>
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
