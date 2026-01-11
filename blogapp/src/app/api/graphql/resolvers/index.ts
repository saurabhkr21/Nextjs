import prismaClient from "@/services/prisma";
import { blog } from "../../../../../generated/prisma";

export async function getBlogById(parent: any, args: { id: string }) {
  const id = args.id;
  const blog = await prismaClient.blog.findUnique({
    where: {
      id: id,
    },
  });
  return blog;
}

export async function getBlogs(blog: any, args: { q: string }) {
  const q = args?.q || "";
  const blogs = await prismaClient.blog.findMany({
    where: {
      title:{
        contains:q,
        mode: "insensitive"
      }
    },
  });
  return blogs;
}
