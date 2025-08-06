"use client";
import Header from "@/components/Header";
import SideBarSort from "./SideBarSort";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="flex">
        <SideBarSort />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
