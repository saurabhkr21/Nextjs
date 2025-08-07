"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function SideBarSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const q = searchParams.get("q") || "";

  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [jobType, setJobType] = useState("");

  // Hide filter sidebar on job detail page
  if (pathname.startsWith("/jobs/")) {
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (minSalary) params.set("ms", minSalary);
    if (maxSalary) params.set("max", maxSalary);
    if (jobType) params.set("type", jobType);

    router.push("/jobs?" + params.toString());
  }

  return (
    <aside className="w-full h-screen bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-2xl flex flex-col gap-8 border border-gray-200 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <h2 className="text-3xl font-extrabold text-blue-500 dark:text-blue-400 mb-2 tracking-tight flex items-center gap-2">
          <svg
            className="w-7 h-7 text-blue-400 dark:text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7h18M3 12h18M3 17h18"
            />
          </svg>
          Filter Jobs
        </h2>

        {/* Salary Range */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Minimum Salary
            </label>
            <input
              type="number"
              value={minSalary}
              onChange={(e) => setMinSalary(e.target.value)}
              placeholder="e.g. 20000"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition shadow-sm bg-white dark:bg-gray-700 dark:text-white"
              min={0}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Maximum Salary
            </label>
            <input
              type="number"
              value={maxSalary}
              onChange={(e) => setMaxSalary(e.target.value)}
              placeholder="e.g. 100000"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition shadow-sm bg-white dark:bg-gray-700 dark:text-white"
              min={0}
            />
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Job Type
          </label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition shadow-sm bg-white dark:bg-gray-700 dark:text-white"
          >
            <option value="">All Types</option>
            <option value="remote">Online</option>
            <option value="offline">Offline</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Apply Filters
          </span>
        </button>
      </form>
      <div className="mt-auto text-xs text-gray-500 dark:text-gray-400 text-center">
        <span>Tip: Use filters to find jobs that match your preferences!</span>
      </div>
    </aside>
  );
}
