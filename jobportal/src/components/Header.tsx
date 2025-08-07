// @ts-nocheck
"use client";

import AddJob from "@/app/(group)/AddJob";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddCompany from "./AddCompany";
import SearchInput from "./SearchInput";
import { useTheme } from "next-themes";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [name, setName] = useState("Guest");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const rawCookies = document.cookie;
      console.log("Current Cookies:", rawCookies); // Debugging line

      const cookies = rawCookies.split("; ");
      const nameCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("name=")
      );

      if (nameCookie) {
        const [, value] = nameCookie.split("=");
        if (value) {
          const decodedName = decodeURIComponent(value.trim());
          setName(decodedName || "Guest");
        }
      }
    }
  }, []);

  function handleThemeToggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  function handleViewCompany() {
    redirect("/company");
  }

  function handleLogOut() {
    if (confirm("Are you sure you want to log out?")) {
      document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      console.log("Logged out successfully");
      router.push("/login");
      router.refresh();
    }
  }

  function handleCompany() {
    router.push("/AddCompany");
  }

  function handleSelectChange(e) {
    const value = e.target.value;
    if (value === "logout") {
      handleLogOut();
    }
    if (value === "AddCompany") {
      handleCompany();
    }
    if (value === "professional") {
      router.push("/Job");
    }
    if (value === "ViewApplication") {
      router.push("/applied-jobs");
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Left Section - User Controls & Navigation */}
        <div className="flex items-center gap-3">
          {/* User Profile Dropdown */}
          <div className="relative">
            <select
              className="appearance-none bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-300 px-4 py-2 pr-8 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
              onChange={handleSelectChange}
              value="personal"
            >
              <option value="personal">👤 {name}</option>
              <option value="ViewApplication">View Applications</option>
              <option value="AddCompany">Add Company</option>
              <option value="logout"> Logout</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {/* Primary Navigation */}
          <nav className="flex items-center gap-2">
            <Link href="/">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                Home
              </button>
            </Link>

            <Link href="/saved">
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-2 py-2 rounded-lg text-xs sm:text-sm font-xs transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                Saved Jobs
              </button>
            </Link>
          </nav>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <SearchInput />
        </div>

        {/* Right Section - Secondary Navigation */}
        <nav className="hidden sm:flex items-center gap-2">
          <AddJob />
          {/* <AddCompany /> */}
          <button
            onClick={handleViewCompany}
            className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-lg text-xs md:text-sm font-medium text-gray-700 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            Company
          </button>
          <button
            className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-lg text-xs md:text-sm font-medium text-gray-700 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md"
            onClick={handleThemeToggle}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </button>

          <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
            API
          </button>
        </nav>

        {/* Mobile Menu Button (for future mobile menu) */}
        <button className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}
