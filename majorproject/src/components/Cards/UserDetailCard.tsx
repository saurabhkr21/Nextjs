"use client";

import Image from "next/image";
import { useState } from "react";
import { User } from "../../../generated/prisma";
import EditUserBtn from "../Botton/EditUserBtn";
import UpdateUserRole from "./UpdateUserRole";
import { Avatar } from "@radix-ui/themes";

export default function UserDetailPage({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = () => setIsEditing(true);

  const handleUpdate = () => {
    console.log("Updated user:", formData);
    setIsEditing(false);
  };

  console.log("User Detail Page - User userdetail:", user?.avatar);
  console.log("User Detail Page - User userdetail:", formData);

  return (
    <div className="min-h-screen  flex flex-col items-center py-10 px-4">

      {/* Page container */}
      <div className="w-full max-w-3xl  rounded-2xl shadow-xl border p-8">
        {/* Header */}
        <div className="flex flex-col items-center border-b pb-6 mb-6">
          <Avatar
            size="9"
            src={user?.avatar || "/default-avatar.png"}
            radius="full"
            fallback={user?.name?.charAt(0) || "U"}
            className="border-2 border-blue-400"
          />
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-4 text-2xl font-semibold border-b focus:outline-none text-center"
            />
          ) : (
            <h1 className="mt-4 text-2xl ">
              {formData.name}
            </h1>
          )}
          <p className="text-gray-500">@{formData.username}</p>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm ">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm ">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>

              <div>
                <label className="block text-sm ">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 mt-1"
                />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg">{formData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Password
                </p>
                <p className="text-lg">••••••••</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Role</p>
                <p className="text-lg">{formData.role}</p>
              </div>
            </div>
          )}
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <EditUserBtn user={formData} />
          <UpdateUserRole user={formData} />
        </div>
      </div>
    </div>
  );
}
