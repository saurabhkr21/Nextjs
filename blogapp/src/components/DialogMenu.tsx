"use client";
import { UserContext } from "@/app/layout";
import { useDialog } from "@/contexts/DialogContextProvider";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";
import AddBlog from "./Button/AddBlog";

export default function DialogMenu() {
  //@ts-ignore
  const { open, setOpen, closeDialog } = useDialog();
  const btnRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  //@ts-ignore
  const { user } = useContext(UserContext);
  
  const tag = user?.name?.split(" ")[0]?.charAt(0) || "U";
  function handleLogout() {
    if (confirm("Are you sure you want to log out?")) {
      // Delete token cookie
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <div className="relative inline-block mr-4">
      <button
        ref={btnRef}
        className="flex items-center justify-center w-10 h-10 rounded-full text-lg font-extrabold bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg hover:scale-105 transition outline-fuchsia-300 focus:ring-2 focus:ring-blue-400 relative"
        aria-label="Open menu"
        tabIndex={0}
        onClick={() => setOpen((prev: any) => !prev)}
      >
        <span className="flex  items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xl">
          {tag}
        </span>
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
              <div className="font-bold text-lg text-gray-800 shadow-amber-500 dark:text-gray-100 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xl">
                  {tag}
                </span>
                <div>
                  <p className="text-xs text-sky-400">Welcome back!</p>
                  {user?.name || "Guest"}
                </div>
              </div>
              <Link
                href="/myblog"
                className="dark:text-white text-slate-800 w-full px-2 py-2 items-center justify-center flex flex-1 hover:border-2 rounded hover:bg-blue-500"
                onClick={() => setOpen(false)}
              >
                My Blogs
              </Link>
              <AddBlog onAdd={() => setOpen(false)} />
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded-md hover:border-2 hover:border-blue-500 text-white font-semibold hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}