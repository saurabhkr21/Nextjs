"use client";

import { useJobContext } from "../../context";
import JobCard from "../../components/JobCard";
import Header from "@/components/card/Header";

export default function SavedJobsPage() {
  const { savedJobs, isLoading, clearAllSavedJobs } = useJobContext();

  if (isLoading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Loading skeleton */}
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse bg-white rounded-xl shadow p-4"
            >
              <div className="h-10 w-10 bg-gray-200 rounded-xl mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header/>
      <div className="flex justify-between items-center  p-6">
        <h1 className="text-2xl font-bold">Saved Jobs ({savedJobs.length})</h1>
        {savedJobs.length > 0 && (
          <button
            onClick={clearAllSavedJobs}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Clear All
          </button>
        )}
      </div>
      {savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
          {savedJobs.map((item) => (
            <div
              key={item.id}
              className="rounded-xl shadow hover:shadow-lg transition"
            >
              <JobCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <svg
            className="h-14 w-14 text-gray-300 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No saved jobs yet
          </h3>
          <p className="text-gray-500 mb-4">
            Browse jobs and save the ones you're interested in to see them here.
          </p>
          <a
            href="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Browse Jobs
          </a>
        </div>
      )}
    </div>
  );
}