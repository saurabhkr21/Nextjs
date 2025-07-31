// @ts-nocheck
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
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

  function handleSelectChange(e) {
    const value = e.target.value;
    if (value === "logout") {
      handleLogOut();
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
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
              <option value="professional">💼 Professional</option>
              <option value="logout">🚪 Logout</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Primary Navigation */}
          <nav className="flex items-center gap-2">
            <Link href="/">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                🏠 Home
              </button>
            </Link>

            <Link href="/saved">
              <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                💾 Saved Jobs
              </button>
            </Link>
          </nav>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <form action="/jobs" className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="query"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 hover:border-amber-300 focus:border-amber-500 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 transition-all duration-200"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="submit"
                  className="text-amber-600 hover:text-amber-700 transition-colors duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Section - Secondary Navigation */}
        <nav className="hidden sm:flex items-center gap-2">
          <button className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-lg text-xs md:text-sm font-medium text-gray-700 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md">
            🏪 API Marketplace
          </button>
          <button className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-lg text-xs md:text-sm font-medium text-gray-700 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md">
            🏢 Orgs
          </button>
          <button className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-lg text-xs md:text-sm font-medium text-gray-700 transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md">
            🎨 Studio
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
            ⚡ API
          </button>
        </nav>

        {/* Mobile Menu Button (for future mobile menu) */}
        <button className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}