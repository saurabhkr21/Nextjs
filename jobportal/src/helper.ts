import { cookies } from "next/headers";
import prismaClient from "./services/prisma";
import { verifyToken } from "./services/jwt";

export async function getUserFromCookies() {
  const userCookies = await cookies();
  const token = userCookies.get("token")?.value;
  // const email=userCookies.get("token")?.value;

  if (!token) {
    return null; // Token is not present
  }
  const data = verifyToken(token);

  if (!data) {
    return null; // Token is invalid
  }

  const user = await prismaClient.user.findUnique({
    where: {
      id: data.id,
    },include:{
      company:true,
    },omit:{
      password:true
    }
  });

  // If user is not found
  if (!user) {
    return null;
  }
  return user;
}
