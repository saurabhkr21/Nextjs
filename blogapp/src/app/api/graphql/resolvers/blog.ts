import { getUserFromCookies } from "@/helper";
import prismaClient from "@/services/prisma";

export async function createBlog(x: any, args: any) {
  const user = await getUserFromCookies();
  if (!user || !user.id) {
    // User not authenticated, return null or error
    return null;
  }

  const blogToSave = {
    title: args.title,
    content: args.content,
    image_url: args.image_url,
    userId: user.id, // <-- use userId only if user exists
  };
  try {
    const blog = await prismaClient.blog.create({
      data: blogToSave,
    });
    return blog;
  } catch (e) {
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
  // const { id, title, content, image_url } = args;
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
