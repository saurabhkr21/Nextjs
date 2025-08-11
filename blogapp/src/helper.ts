import { cookies } from "next/headers";
import prismaClient from "./services/prisma";

export async function getUserFromCookies() {
  const userCookies = await cookies();
  const id = userCookies.get("token")?.value;

  if (!id) {
    return null;
  }
  

  const user = await prismaClient.user.findUnique({
    where: {
      id
    },
  });

  // If user is not found
  if (!user) {
    return null;
  }

  // Remove password before returning
  const { password, ...safeUser } = user;
  return safeUser;
}
