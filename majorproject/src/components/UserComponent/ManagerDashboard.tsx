"use client";
import { GET_ALL_USERS } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import React from "react";
import { User } from "../../../generated/prisma";
import AddProductBtn from "../Botton/Add-Products-Btn";
import ProductList from "../Cards/ProductList";

export default function ManagerDashboard() {
  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data: {
        getAllUsers: User[];
      } = await gqlClient.request(GET_ALL_USERS);
      setUsers(data?.getAllUsers || []);
    };
    fetchData();
  }, []);

  return (
    <div className="flex  p-4 w-full h-screen">
      <div className="flex-1 flex flex-col gap-4 h-full">
        <AddProductBtn />
        <div className="flex-1 flex flex-col justify-center items-center">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
