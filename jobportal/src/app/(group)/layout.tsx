//@ts-nocheck
"use client";
import Header from "@/components/Header";

import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function Layout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const res = await fetch("/api/current-user");
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
      }
    }
    getUser();
  }, []);

  return (
    <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        {children}
      </UserContext.Provider>
    </div>
  );
}
