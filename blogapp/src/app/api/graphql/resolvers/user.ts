import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";

export async function signUpUser(
  x: any,
  args: {
    name: string;
    email: string;
    password: string;
  }
) {
  try {
    await prismaClient.user.create({
      data: args,
    });
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

export async function loginUser(
  x: any,
  args: {
    email: string;
    password: string;
  }
) {
  const cookieStore = await cookies();
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: args.email,
      },
    });
    if (user && user.password === args.password) {
      cookieStore.set("token", user.id);
      // cookieStore.set("token1", user.name);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

export async function currentUser() {
  try {
    const user = await getUserFromCookies();
    if (!user || !user.id) {
      return { user: null, blogs: [] };
    }
    const blogs = await prismaClient.blog.findMany({
      where: {
        userId: user.id,
      },
    });
    return blogs;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}
