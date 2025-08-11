import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";

export async function createBlog(
  x: any,
  args: {
    title: string;
    content: string;
    image_url?: string;
  }
) {
  const user = await getUserFromCookies();
  console.log("User from cookies in createBlog:", user); // Add this log

  if (!user || !user.id) {
    console.error("No authenticated user found. Cannot set userId.");
    return null;
  }

  const blogToSave = {
    title: args.title,
    content: args.content,
    image_url: args.image_url,
    userId: user.id,
  };
  try {
    const blog = await prismaClient.blog.create({
      data: blogToSave,
    });
    return blog;
  } catch (e) {
    console.error("Error creating blog:", e);
    return null;
  }
}

export async function deleteBlog(x: any, args: any) {
  const { id } = args;
  console.log("Deleting blog with ID:", id);
  try {
    await prismaClient.blog.delete({
      where: {
        id: id,
      },
    });

    return true;
  } catch (e) {
    return false;
  }
}

export async function updateBlog(
  x: any,
  args: {
    id: string;
    title?: string;
    content?: string;
    image_url?: string;
  }
) {
  const dataToUpdate = {
    title: args.title,
    content: args.content,
    image_url: args.image_url,
  };
  try {
    const blog = await prismaClient.blog.update({
      where: {
        id: args.id,
      },
      data: {
        ...dataToUpdate,
      },
    });
    return blog;
  } catch (e) {
    return false;
  }
}

export async function getBlogUser(blog: any) {
  const userId = blog.userId;
  try {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
