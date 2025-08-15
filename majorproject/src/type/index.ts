import { Product, Sale, User } from "../../generated/prisma";

export type ProductsWithSales = Product & { sales: Sale[] };

export type userWithoutRole = Omit<User, "role">;
