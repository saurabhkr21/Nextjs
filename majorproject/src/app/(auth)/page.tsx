"use client";
import { UserContext } from "@/components/contexts/UserContextProvider";
import AdminDashboard from "@/components/UserComponent/AdminDashboard";
import ManagerDashboard from "@/components/UserComponent/ManagerDashboard";
import StaffDashboard from "@/components/UserComponent/StaffDashboard";
import { useContext } from "react";

export default function page() {
  const { user } = useContext(UserContext);
  if (!user) return null;
  if (user.role === "admin") return <AdminDashboard />;
  if (user.role === "manager") return <ManagerDashboard />;
  if (user.role === "staff") return <StaffDashboard />;
  return null;
}
