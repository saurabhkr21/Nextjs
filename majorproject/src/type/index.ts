import { Product, RoleType, Sale, User } from "../../generated/prisma";

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

export type ChartDataType = {
  date: string;
  quantity: number;
}[];

export type CurrentUser = {
  user: {
    id: string;
    email: string;
    username: string;
    name: string;
    password?: string;
    avatar: string | null;
    role: RoleType;
  } | null;
};

export type UserWithoutPassword = Omit<User, "password"> | null;