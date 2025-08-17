"use client";

import { UserDetailCardProps } from "@/type";
import { User } from "../../../generated/prisma";

export default function CurrentUserDetail({ user }: { user: User }) {
  const current = user;
  if (!current) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-slate-100 to-blue-200 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="text-center text-xl text-gray-500 dark:text-white">
          No user details found.
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 ">
      {/* Card Container */}
      <div className="w-full max-w-3xl rounded-3xl shadow-2xl border border-blue-200 dark:border-slate-700  p-10 transition-all duration-300 hover:scale-[1.01]">
        {/* Header */}
        <div className="flex flex-col items-center border-b border-blue-100 dark:border-slate-700 pb-8 mb-8">
          <div className="relative group">
            <img
              src={current.avatar || "/default-avatar.png"}
              alt="User Avatar"
              className="w-36 h-36 rounded-full border-4 border-blue-300 dark:border-blue-500 shadow-xl object-cover transition-all duration-300 group-hover:scale-105"
            />
            <span className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-semibold">
              Current User
            </span>
          </div>
          <h1 className="mt-6 text-3xl font-extrabold  tracking-tight text-center">
            {current.name}
          </h1>
          <p className="text-base  font-medium mt-1">@{current.username}</p>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-sm ">Id</span>
            <span className="text-lg font-medium">{current.id}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm">Email</span>
            <span className="text-lg font-medium break-all">
              {current.email}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm ">Password</span>
            <span className="text-lg font-medium">••••••••</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm ">Role</span>
            <span className="text-lg font-medium">{current.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
