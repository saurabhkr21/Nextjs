import { cookies } from "next/headers";
import { verifyToken } from "./lib/services/jwt";
import prismaClient from "./lib/services/prisma";

export async function getUserFromCookies() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return null;
    }
    const data = verifyToken(token);
    if (!data?.id) {
      return null;
    }
    const user = await prismaClient.user.findUnique({
      where: {
        id: data?.id,
      },
      omit: {
        password: true,
      },
    });
    if (!user) return null;
    return user;
  } catch (error) {
    console.error("Error getting user from cookies helper:", error);
    return null;
  }
}
