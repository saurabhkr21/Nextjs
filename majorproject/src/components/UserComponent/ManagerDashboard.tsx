"use client";
import { GET_ALL_SALES, GET_ALL_USERS } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import React, { useEffect } from "react";
import { Sale, User } from "../../../generated/prisma";
import AddProductBtn from "../Botton/Add-Products-Btn";
import ProductList from "../Cards/ProductList";
import AllProductSaleChart from "../Cards/AllProductSaleChart";

export default function ManagerDashboard() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [sales, setSales] = React.useState<[Sale]>();

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
    <div className="flex  p-4 w-full h-screen">
      <div className="flex-1 flex flex-col gap-4 h-full">
        <div className="flex justify-between items-center mb-4">
          <AddProductBtn />
          <AllProductSaleChart chartData={chartData} />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
