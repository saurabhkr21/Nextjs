"use client";

import { Briefcase } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import SearchBarInput from "../SearchBarInput";
import ThemeToggle from "../UI/ThemeToggle";
import DialogCard from "./DialogCard";

export default function Header() {
  const { theme } = useTheme();
  const bgColor =
    theme === "dark"
      ? "bg-gray-800"
      : theme === "light"
      ? "bg-white"
      : "bg-white"; // fallback for system

  return (
    <header className={`shadow-sm sticky top-0 z-50 ${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className=" items-center space-x-2 hidden md:flex">
            <Briefcase className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">JobPortal</span>
          </Link>
          <nav className="hidden md:flex space-x-8 ">
            <Link
              href="/jobs"
              className=" hover:text-blue-600 transition-colors"
            >
              Find Jobs
            </Link>
            <Link
              href="/company"
              className=" hover:text-blue-600 transition-colors"
            >
              Company
            </Link>
            <Link
              href="/saved"
              className=" hover:text-blue-600 transition-colors"
            >
              Saved Jobs
            </Link>
            <Link href="/add-job">
              <button className="hover:text-blue-600 transition-colors">
                Add Job
              </button>
            </Link>
          </nav>
          <nav className="flex items-center justify-center md:hidden">
            <SearchBarInput />
          </nav>

          <div className="flex p-2">
            <ThemeToggle />
            <DialogCard />
          </div>
        </div>
      </div>
    </header>
  );
}
