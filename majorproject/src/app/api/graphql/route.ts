import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./typeDefs";
import { createUser, loginUser, updateUserProfile, updateUserRole } from "./resolvers/user";
import { getUserFromCookies } from "@/helper";

const resolvers = {
  Query: {
    loginUser,
    currentUser: getUserFromCookies,
  },
  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Typescript: req has the type NextRequest
const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export { handler as GET, handler as POST };
