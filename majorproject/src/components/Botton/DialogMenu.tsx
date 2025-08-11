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

  // useEffect(() => {
  //   async function fetchUserdata() {
  //     try {
  //       const res = await fetch("/api/user");
  //       const data = await res.json();
  //       if (data && data.user && data.user.name) {
  //         setUser(data.user);
  //         setName(data.user.name);
  //       } else {
  //         setUser(null);
  //         setName("Guest");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching user data:", err);
  //       setUser(null);
  //       setName("Guest");
  //     }
  //   }

  //   fetchUserdata();
  // }, []);

  function handleLogout() {
    if (confirm("Are you sure you want to log out?")) {
      // document.cookie =
      //   "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        className="p-2 rounded-full hover:bg-gray-700 transition outline-fuchsia-300 focus:ring-2 focus:ring-blue-400 relative"
        aria-label="Open menu"
        tabIndex={0}
        onClick={() => setOpen((prev: any) => !prev)}
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
              <div className="font-bold text-lg text-gray-800 shadow-amber-500 dark:text-gray-100">
                <p className="text-xs text-sky-200">Welcome back!</p>
                {user?.name || "Guest"}
              </div>
              <Link
                href="/myblog "
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
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
