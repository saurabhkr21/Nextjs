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
      <div className="h-screen flex items-center justify-center">
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="relative w-16 h-16 rounded-full overflow-hidden">
            <Image
              fill
              src="https://cdn-icons-png.flaticon.com/512/12474/12474329.png"
              alt="Logo"
            />
          </div>
          <TextField.Root
            className="mb-4 w-96"
            placeholder="Username or email"
            value={userCred}
            onChange={(e) => setUserCred(e.target.value)}
          />

          <TextField.Root
            type="password"
            className=" w-96 "
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error.message && (
            <Text className="text-red-500">{error.message}</Text>
          )}
          <Button
            disabled={loading}
            style={{ width: "100%", margin: "20px 0" }}
            className="mt-4"
            onClick={handleLogin}
          >
            <Text>LogIn</Text>
          </Button>
        </Card>
      </div>
    </main>
  );
}
