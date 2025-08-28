"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { company, user } from "../../generated/prisma";

type UwC = user & { company: company | null };

const userContext = createContext<{
  userData?: UwC | null;
  setUserData?: (value: UwC) => void;
}>({});

export default function UserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [userData, setUserData] = useState<UwC | null>(null);

  useEffect(() => {
    async function getData() {
      const res = await fetch(`http://localhost:3000/api/current-user`);
      const data = await res.json();
      if (data.success) {
        setUserData(data.data);
      } else {
        console.error("Failed to fetch user data");
      }
    }
    getData();
  }, []);

  return (
    <userContext.Provider value={{ userData, setUserData }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  return useContext(userContext);
}
