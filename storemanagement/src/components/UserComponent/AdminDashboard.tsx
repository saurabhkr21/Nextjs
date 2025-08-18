"use client";
import { GET_ALL_SALES, GET_ALL_USERS } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import { User2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Sale, User } from "../../../generated/prisma";
import AddProductBtn from "../Botton/Add-Products-Btn";
import AddUserBtn from "../Botton/Add-User-Btn";
import AllProductSaleChart from "../Cards/AllProductSaleChart";
import ProductList from "../Cards/ProductList";
import UserCard from "../Cards/UserCard";

export default function AdminDashboard() {
  const [showUserList, setShowUserList] = React.useState(false);
  const [users, setUsers] = React.useState<User[]>([]);
  const [sales, setSales] = useState<[Sale]>();

  React.useEffect(() => {
    const fetchData = async () => {
      const data: {
        getAllUsers: User[];
      } = await gqlClient.request(GET_ALL_USERS);
      setUsers(data?.getAllUsers || []);
    };
    fetchData();
  }, []);

  useEffect(() => {
    async function getAllSales() {
      try {
        const data: { getAllSales: [Sale] } = await gqlClient.request(
          GET_ALL_SALES
        );
        if (data?.getAllSales) {
          setSales(data?.getAllSales);
        } else {
          console.log("sales are not available");
        }
      } catch {
        console.log("Error finding sales");
      }
    }
    getAllSales();
  }, []);

  const chartData = (sales ?? []).map((sale) => {
    const date = new Date(Number(sale.createdAt));
    const format =
      date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    const quantity = sale.quantity;

    const obj = {
      date: format,
      quantity,
    };

    return obj;
  });

  return (
    <div className="flex p-4 w-full h-screen flex-col sm:flex-row">
      <div className="flex-1 flex flex-col w-full gap-4 h-full sm:w-2/3">
        <div className="flex items-center justify-start m-1 gap-2">
          <AddProductBtn />
          <AllProductSaleChart chartData={chartData} />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center overflow-y-scroll scrollbar-hide">
          <div className="flex flex-col gap-4 h-full">
            <ProductList />
          </div>
        </div>
      </div>

      <div className="flex flex-col m-1 w-full gap-4 h-full sm:w-1/3">
        <div className="sm:flex items-center justify-end m-1 hidden">
          <AddUserBtn />
        </div>
        <div className="flex flex-col m-2 gap-2 h-full items-end overflow-y-scroll scrollbar-hide">
          {/* Small screens: user icon toggles user list */}
          <div className="sm:hidden flex flex-col items-end w-full">
            <div className="flex justify-between w-full items-center mb-2">
              <AddUserBtn />
              <button
                className="p-3 rounded-full justify-between  shadow-lg hover:bg-blue-200 dark:hover:bg-slate-800 transition-colors mb-2"
                onClick={() => setShowUserList((v) => !v)}
                aria-label="Show users"
              >
                <User2 className="w-8 h-8 " />
              </button>
            </div>
            {showUserList && (
              <ul className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl p-2 border border-gray-200 dark:border-slate-700 w-full">
                {users.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </ul>
            )}
          </div>
          {/* Large screens: always show user list */}
          <ul className="hidden sm:flex flex-col gap-2">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </ul>
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
