"use client";

import { useState } from "react";
import { Pencil, Trash2, Save } from "lucide-react";
import { User } from "../../../generated/prisma";
import EditUserBtn from "../Botton/EditUserBtn";
import UpdateUserRole from "./UpdateUserRole";

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

  const handleDelete = () => {
    console.log("Deleted user:", user.id);
  };

  return (
    <div className="min-h-screen dark:bg-slate-900 dark:text-white flex flex-col items-center py-10 px-4">
      {/* Page container */}
      <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-2xl shadow-xl border p-8">
        {/* Header */}
        <div className="flex flex-col dark:text-white items-center border-b pb-6 mb-6">
          <img
            src={formData.avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-lg"
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
            <h1 className="mt-4 text-2xl font-bold dark:text-white text-gray-800">
              {formData.name}
            </h1>
          )}
          <p className="text-gray-500">@{formData.username}</p>
        </div>

        {/* Details Section */}
        <div className="space-y-4 text-gray-700 dark:text-white">
          {isEditing ? (
            <>
              <div>
                <label className="block text-sm text-gray-500 dark:text-white">
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
                <label className="block text-sm text-gray-500 dark:text-white">
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
                <label className="block text-sm text-gray-500 dark:text-white">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded px-3 dark:text-white py-2 mt-1"
                />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 dark:text-white gap-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-white">Email</p>
                <p className="text-lg">{formData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-white">
                  Password
                </p>
                <p className="text-lg">••••••••</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-white">Role</p>
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
