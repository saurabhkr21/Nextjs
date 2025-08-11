import { getUserFromCookies } from "@/helper";
import { generateToken } from "@/services/jwt";
import prismaClient from "@/services/prisma";
import { cookies } from "next/headers";
import { RoleType } from "../../../../../generated/prisma";

export async function loginUser(
  _: any,
  args: { userCred: string; password: string }
) {
  try {
    const cookiesStore = await cookies();
    const user = await prismaClient.user.findUnique({
      where: {
        email: args.userCred,
      },
    });
    if (!user) return false;
    if (user && user.password === args.password) {
      //tokenize user id
      const token = generateToken({ id: user.id });
      cookiesStore.set("token", token);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    return false;
  }
}

export async function createUser(
  _: any,
  args: {
    name: string;
    email: string;
    username: string;
    password: string;
  }
) {
  try {
    const user = await getUserFromCookies();
    if (!user) return false;
    if (user.role !== "admin") {
      return null;
    }
    const createdUser = await prismaClient.user.create({
      data: args,
    });
    return createdUser ? true : false;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

export async function updateUserRole(
  _: any,
  args: { userId: string; role: RoleType }
) {
  try {
    const user = await getUserFromCookies();
    if (!user) return null;
    if (user.role !== "admin") {
      return null;
    }
    const updatedUser = await prismaClient.user.update({
      where: { id: args.userId },
      data: { role: args.role },
    });
    return updatedUser ? true : false;
  } catch (error) {
    console.error("Error updating user role:", error);
    return null;
  }
}

export async function updateUserProfile(
  _: any,
  args: {
    userId: string;
    name: string;
    email: string;
    username: string;
    avatar: string;
  }
) {
  try {
    const user = await getUserFromCookies();
    const dataToSave={
        name: args.name,
        email: args.email,
        username: args.username,
        avatar: args.avatar,
    }
    if (user?.role != "admin" && user?.id != args.userId) return false;

    await prismaClient.user.update({
      where: { id: args.userId },
      data: dataToSave
    });
    return true;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return null;
  }
}
