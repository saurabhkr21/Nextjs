"use client";
import { GET_ALL_USERS } from "@/lib/gql/queries";
import gqlClient from "@/lib/services/gql";
import React from "react";
import { User } from "../../../generated/prisma";
import AddProductBtn from "../Botton/Add-Products-Btn";
import AddUserBtn from "../Botton/Add-User-Btn";
import ProductList from "../Cards/ProductList";
import UserCard from "../Cards/UserCard";

export default function StaffDashboard() {
  return (
    <div className="flex p-4 w-full h-screen">
      <div className="flex-1 flex flex-col gap-4 h-full ">
        <div className="flex-1 flex flex-col justify-center items-center">
          <ProductList />
        </div>
      </div>
    </div>
  );
}
