'use client'
import { createContext, ReactNode, useState } from "react";
import { RoleType } from "../../../generated/prisma";

type UserWithoutPassword = {
  id: string;
  email: string;
  name: string;
  username: string;
  avatar: string | null;
  role: RoleType;
};
export const UserContext = createContext<{ user?: UserWithoutPassword }>({});

export default function UserProvider({
  children,
  user,
}: {
  children: ReactNode;
  user: UserWithoutPassword;
}) {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
