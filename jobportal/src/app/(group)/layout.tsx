"use client";

import Header from "@/components/card/Header";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type User = {
  name?: string;
  email?: string;
  role?: string;
};

type UserContextType = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

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
