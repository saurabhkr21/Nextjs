"use client";
import { GET_ALL_USERS } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import React from "react";
import { User } from "../../../generated/prisma";
import AddProductBtn from "../Botton/Add-Products-Btn";
import AddUserBtn from "../Botton/Add-User-Btn";
import ProductList from "../Cards/ProductList";
import UserCard from "../Cards/UserCard";
import EditUserBtn from "../Botton/EditUserBtn";

export default function AdminDashboard() {
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
    <div className="flex justify-between p-4 w-full h-screen bg-gradient-to-br from-blue-50 via-white to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex-1 flex flex-col w-2/3 gap-4 h-full overflow-y-scroll scrollbar-hide">
        <AddProductBtn />
        <div className="flex-1 flex flex-col justify-center items-center">
          <ProductList />
        </div>
      </div>

      <div className="flex flex-col m-1 w-1/3 gap-4 h-full">
        <div className="flex items-center justify-end m-1">
          <AddUserBtn />
        </div>
        <div className="flex flex-col m-2 gap-2 h-full overflow-y-scroll scrollbar-hide">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* User Cards */}
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
