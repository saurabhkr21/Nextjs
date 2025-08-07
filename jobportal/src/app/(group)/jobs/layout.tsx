//@ts-nocheck

import SideBarSort from "@/app/(group)/SideBarSort";

export default function layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-800 transition-colors duration-300">
      <aside
        className="fixed hidden sm:flex top-20 left-0 h-[calc(100vh-5rem)] z-40 shadow-xl"
        style={{ width: "clamp(180px, 22vw, 320px)" }}
      >
        <div className=" h-full flex items-start justify-center p-4">
          <SideBarSort />
        </div>
      </aside>
      <main className="flex-1 lg:ml-[clamp(180px,22vw,320px)] p-4 sm:p-6 transition-all duration-300">
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-4 sm:p-6 min-h-[80vh] border border-gray-100 dark:border-gray-800 transition-colors duration-300">
          {children}
        </section>
      </main>
    </div>
  );
}
