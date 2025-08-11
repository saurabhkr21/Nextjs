import prismaClient from "@/services/prisma";

export async function getBlogById(parent: any, args: any) {
  const id = args.id;
  const blog = await prismaClient.blog.findUnique({
    where: {
      id: id,
    },
  });
  return blog;
}

export async function getBlogs(blog: any, args: any) {
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
