import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import typeDefs from "./typeDefs";
import { createUser, getAllUsers, getUser, loginUser, updateUserProfile, updateUserRole } from "./resolvers/user";
import { getUserFromCookies } from "@/helper";
import { addProducts, createSale, deleteProduct, getAllProducts, getAllSales, getProduct, updateProduct } from "./resolvers/products";
import { get } from "http";

const resolvers = {
  Query: {
    loginUser,
    currentUser: getUserFromCookies,
    getAllUsers,
    getAllProducts,
    getProduct,
    getUser,
    getAllSales
  },
  Mutation: {
    createUser,
    updateUserRole,
    updateUserProfile,
    addProducts,
    createSale,
    updateProduct,
    deleteProduct
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
