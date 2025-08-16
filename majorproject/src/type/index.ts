import { Product, Sale, User } from "../../generated/prisma";

export type ProductsWithSales = Product & { sales: Sale[] };

export type userWithoutRole = Omit<User, "role">;

export type UserDetailCardProps = {
  user: {
    id: string;
    email: string;
    username: string;
    name: string;
    password?: string;
    role: string;
    avatar?: string | null;
  } | null;
};
