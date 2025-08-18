import DialogMenu from "./DialogMenu";
import Link from "next/link";

export default function Header() {
  return (
    <div
      className="flex items-center-safe justify-between w-full rounded-b-2xl sticky top-0   opacity-80 bg-white dark:bg-gray-800 p-0.5 shadow-lg z-50"
    >
      <Link href="/" className="ml-4 flex items-center">
        <img src="/blog.svg" alt="Blog Logo" width={65} />
      </Link>

      <form
        action={"/search"}
        className="flex items-center gap-2 w-full max-w-lg mx-auto"
      >
        <input
          className="border border-gray-300 rounded-l-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="search"
          placeholder="Search blogs..."
          name="q"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-r-md font-semibold hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>
      <DialogMenu />
    </div>
  );
}
