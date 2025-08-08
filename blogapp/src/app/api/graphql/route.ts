import prismaClient from "@/services/prisma";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";

const blogsArr = [
  {
    id: "101",
    title: "title",
    content: "learn smartly",
    createdAt: "2023-01-01",
    author: "Author 1",
  },
  {
    id: "102",
    title: "title2",
    content: "learn smartly2",
    author: "Author 2",
    createdAt: "2023-01-02",
  },
  {
    id: "103",
    title: "title3",
    content: "learn smartly3",
    createdAt: "2023-01-03",
    author: "Author 3",
  },
];
const blog = {
  id: "101",
  title: "title",
  content: "learn smartly",
  createdAt: "2023-01-01",
};

const typeDefs = gql`
  type Blog {
    id: String
    title: String
    content: String
    image_url: String
    createdAt: String
  }
  type Query {
    blog(id: String): Blog
    blogs(q: String): [Blog]
  }
`;

const resolvers = {
  Query: {
    blog: async (x: any, { id }: { id: string }) => {
      const blog = await prismaClient.blog.findUnique({
        where: {
          id: id,
        },
      });
      return blog;
    },
    blogs: async (x: any, { q }: { q?: string }) => {
      const where = q
        ? {
            title: {
              contains: q,
              mode: "insensitive" as const,
            },
          }
        : undefined;
      const blogs = await prismaClient.blog.findMany({ where });
      return blogs;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
