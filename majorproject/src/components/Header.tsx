import Link from "next/link";
import ThemeToggle from "./Theme/ThemeToggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between w-full rounded-b-2xl sticky top-0 opacity-80  p-2 shadow-sm z-50 shadow-slate-300 transition-colors">
      <Link href="/">
      Major
      </Link>

      <form
        action={"/search"}
        className="flex items-center gap-2 w-full max-w-lg mx-auto"
      >
        <input
          className="border border-gray-300  rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400   transition"
          type="search"
          placeholder="Search "
          name="q"
        />
        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-r-md font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>
      <ThemeToggle />

      {/* <DialogMenu /> */}
    </div>
  );
}
