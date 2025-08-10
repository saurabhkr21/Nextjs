import prismaClient from "./services/prisma";
import { verifyToken } from "./services/jwt";
import { cookies } from "next/headers";

export async function getUserFromCookies() {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;

  if (!token) {
    return null;
  }
  const res = verifyToken(token) as { id: string } | null;

  if (!res) {
    return null;
  }

  const user = await prismaClient.user.findUnique({
    where: {
      id: res?.id,
    },
    omit: {
      password: true
    }
  });

  // If user is not found
  if (!user) {
    return null;
  }
  return user;
}
