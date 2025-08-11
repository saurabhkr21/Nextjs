import { cookies } from "next/headers";
import prismaClient from "./services/prisma";
import { verifyToken } from "./services/jwt";

export async function getUserFromCookies() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get("token")?.value;
    if (!token) {
      return null;
    }
    const data= verifyToken(token);
    if (!data?.id) {
      return null;
    }
    const user = await prismaClient.user.findUnique({
      where: {
        id: data?.id,
      },
    });
    if (!user) return null;
    return user;
  } catch (error) {
    console.error("Error getting user from cookies helper:", error);
    return null;
  }
}
