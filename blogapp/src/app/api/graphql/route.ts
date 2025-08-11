import prismaClient from "@/services/prisma";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";
import { NextRequest } from "next/server";
import { getBlogById, getBlogs } from "./resolvers/route";
import { createBlog, deleteBlog, getBlogUser, updateBlog } from "./resolvers/blog";
import typeDefs from "./typeDefs";
import { currentUser, loginUser, signUpUser } from "./resolvers/user";
import { getUserFromCookies } from "@/helper";


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

  Blog:{
    User:getBlogUser
  },

  User:{
    blogs:async (blog:any) => {
      const userId = blog.userId;
      return await prismaClient.blog.findMany({
        where: {
          userId: userId
        }
      });
    }
  }

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
