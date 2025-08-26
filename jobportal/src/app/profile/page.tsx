"use client";
import { useEffect, useState } from "react";

export default function Page() {
  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    password?: string;
    company?: {
      id: string;
      name: string;
      description: string;
      image_url?: string | null;
    } | null;
  }

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data && data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    }
    fetchUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8  rounded-2xl shadow-lg  border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center gap-2">
        👤 User Profile
      </h1>

      {user ? (
        <div className="space-y-6">
          {/* User Info */}
          <div className=" p-4 rounded-xl shadow-sm">
            <div className="mb-3">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Name:
              </span>{" "}
              {user.name}
            </div>
            <div className="mb-3">
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Email:
              </span>{" "}
              {user.email}
            </div>
            <div>
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                Role:
              </span>{" "}
              <span className="inline-block px-2 py-1 text-sm rounded-full">
                {user.role}
              </span>
            </div>
          </div>

          {/* Company Info */}
          {user.company ? (
            <div className=" p-4 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                🏢 Company
              </h2>
              <div className="mb-2">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Name:
                </span>{" "}
                {user.company.name}
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  Description:
                </span>{" "}
                {user.company.description}
              </div>
              {user.company.image_url && (
                <div className="flex items-center gap-3">
                  <img
                    src={user.company.image_url}
                    alt={user.company.name}
                    className="h-16 w-16 rounded-xl object-cover shadow-md border border-gray-200 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Company Logo
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-gray-500 dark:text-gray-400 text-center rounded-xl shadow-sm">
              No company associated.
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-500 dark:text-gray-400 text-center p-6 rounded-xl shadow-sm">
          No user data found.
        </div>
      )}
    </div>
  );
}
