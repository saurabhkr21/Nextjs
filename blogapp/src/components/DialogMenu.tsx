"use client"
import { MenuIcon } from "lucide-react";
import React, { useRef } from "react";

export default function DialogMenu() {
  const [open, setOpen] = React.useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        className="p-2 rounded-full hover:bg-gray-700 transition outline-fuchsia-300 focus:ring-2 focus:ring-blue-400 relative"
        aria-label="Open menu"
        tabIndex={0}
        onClick={() => setOpen((prev) => !prev)}
      >
        <MenuIcon />
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none">
          Menu
        </span>
      </button>
      {/* Dialog Box */}
      {open && (
        <div className="absolute right-0 mt-2 z-50 min-w-[260px]">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 flex flex-col gap-4 relative border border-gray-200 dark:border-gray-700">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setOpen(false)}
              aria-label="Close dialog"
            >
              ×
            </button>
            <div className="flex flex-col gap-3">
              <div className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                User
              </div>
              <button className="w-full px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                Add Blog
              </button>
              <button className="w-full px-4 py-2 rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
