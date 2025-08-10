import prismaClient from "@/services/prisma";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";
import { getBlogById, getBlogs } from "./resolvers/route";
import { createBlog, deleteBlog, updateBlog } from "./resolvers/blog";
import typeDefs from "./typeDefs";
import { currentUser, loginUser, signUpUser } from "./resolvers/user";
import { getUserFromCookies } from "@/helper";

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

// const typeDefs = gql`
//   type Blog {
//     id: String
//     title: String
//     content: String
//     image_url: String
//     createdAt: String
//   }
//   type Mutation {
//     createBlog(title: String!, content: String!, image_url: String): Blog
//     deleteBlog(id: String!): Boolean!
//     updateBlog(id: String!, title: String, content: String, image_url: String): Blog
//   }
//   type Query {
//     blog(id: String): Blog
//     blogs(q: String): [Blog]
//   }
// `;

const resolvers = {
  
  Query: {
    blog: getBlogById,
    blogs: getBlogs,
    currentUser: getUserFromCookies,
    currentUserBlogs: currentUser,
  },
  Mutation: {
    createBlog,
    deleteBlog,
    updateBlog,
    signUpUser,
    loginUser,
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
