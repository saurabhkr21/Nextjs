//@ts-nocheck
"use client";

import { useJobContext } from "../../context";
import JobCard from "../../components/JobCard";

export default function SavedJobsPage() {
  const { savedJobs, isLoading, clearAllSavedJobs } = useJobContext();

  if (isLoading) {
    return (
      <div className="p-3">
        <h1 className="text-2xl font-bold mb-4">Saved Jobs</h1>
        <div className="grid grid-cols-4 gap-7 sm:grid-cols-2 md:grid-cols-3">
          {/* Loading skeleton */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex gap-3 border-1 rounded-xl p-2">
                <div className="h-10 w-10 bg-gray-300 rounded-xl"></div>
                <div className="flex flex-col flex-1">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="flex gap-2">
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Saved Jobs ({savedJobs.length})</h1>
        {savedJobs.length > 0 && (
          <button
            onClick={clearAllSavedJobs}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {savedJobs.length > 0 ? (
          savedJobs.map((item) => <JobCard key={item.id} item={item} />)
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
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
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No saved jobs yet
              </h3>
              <p className="text-gray-500 mb-4">
                Start browsing jobs and save the ones you're interested in to
                see them here.
              </p>
              <a
                href="/"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Browse Jobs
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
