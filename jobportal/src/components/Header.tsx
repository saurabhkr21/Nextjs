// @ts-nocheck
"use client";

import AddJob from "@/app/(group)/AddJob";
import { useTheme } from "next-themes";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(theme === "dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data && data.user && data.user.email) {
          setUser(data.user);
          const emailDomain = data.user.email.split("@")[0];
          setName(emailDomain);
        } else {
          setUser(null);
          setName("Guest");
        }
      } catch (error) {
        setUser(null);
        setName("Guest");
      }
    }
    fetchUser();
  }, []);
  
  function handleThemeToggle() {
    setTheme(theme === "dark" ? "light" : "dark");
  }
  function handleViewCompany() {
    redirect("/company");
  }

  function handleLogOut() {
    if (confirm("Are you sure you want to log out?")) {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setName("Guest");
      setUser(null);
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
    if (value === "SaveJob") {
      router.push("/saved");
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
          <div className="relative hidden sm:flex rounded-3xl">
            <select
              className="appearance-none bg-slate-400 dark:bg-slate-700 border  border-blue-200
               hover:border-blue-300 px-4 py-2 pr-8 rounded-lg text-sm font-medium  focus:outline-none
               focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
              onChange={handleSelectChange}
              value="personal"
            >
              <option value="personal">👤 {name}</option>
              <option value="SaveJob">Saved Job</option>
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

          {/* Primary Navigation (hide on mobile) */}
          <nav className="hidden sm:flex items-center gap-2">
            <Link href="/">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                Home
              </button>
            </Link>
          </nav>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <SearchInput />
        </div>

        {/* Right Section - Secondary Navigation (hide on mobile) */}
        <nav className="hidden sm:flex items-center gap-2">
          {/* <button
            onClick={handleViewCompany}
            className={`relative group overflow-hidden px-3 py-1.5 rounded-xl border-2 font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
              isDark ? "text-white border-gray-700 " : "border-gray-300"
            }`}
          >
            Company
          </button> */}
          <AddJob />
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="sm:hidden p-2 rounded-lg  hover:bg-gray-500 transition-colors duration-200 absolute left-4 top-4 z-50"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
            className={`w-6 h-6  ${isDark ? "text-gray-100" : "text-gray-700"}`}
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

      {/* Mobile Menu Dialog */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-end bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-900 rounded-l-2xl shadow-2xl w-72 max-w-full h-full p-0 flex flex-col overflow-y-auto">
            {/* Close Button */}
            <div className="flex justify-end p-4 border-b border-gray-200 dark:border-gray-800">
              <button
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* User Profile Dropdown */}
            <div className="px-6 pt-2 pb-4">
              <select
                className="w-full appearance-none bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 hover:border-blue-300 px-4 py-3 pr-8 rounded-lg text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer"
                onChange={handleSelectChange}
                value="personal"
              >
                <option value="personal">👤 {name}</option>
                <option value="SaveJob">Saved Job</option>
                <option value="ViewApplication">View Applications</option>
                <option value="AddCompany">Add Company</option>
                <option value="logout"> Logout</option>
              </select>
            </div>
            <hr className="border-gray-200 dark:border-gray-800 mx-6" />
            {/* Navigation Buttons */}
            <div className="flex flex-col gap-3 px-6 py-4">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-lg text-base font-semibold transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Home
                </button>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleViewCompany();
                }}
                className={`w-full relative group overflow-hidden px-4 py-3 rounded-lg border-2 font-semibold text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isDark ? "text-white border-gray-700 " : "border-gray-300"
                }`}
              >
                Company
              </button>
              <div>
                <AddJob />
              </div>
            </div>
          </div>
          {/* Click outside to close */}
          <div
            className="flex-1"
            onClick={() => setMobileMenuOpen(false)}
            tabIndex={-1}
            aria-label="Close menu"
          />
        </div>
      )}
    </header>
  );
}
