//@ts-nocheck
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SaveJob from "./SaveJob";

export default function JobCard({ item }) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  function handleDetailClick() {
    try {
      if (!item || !item.id) {
        console.error("Invalid job item or missing job_id");
        return;
      }

      if (isNavigating) {
        console.log("Navigation already in progress");
        return;
      }

      setIsNavigating(true);
      // console.log("Navigating to job detail for:", item.job_id);

      // Navigate to dynamic job detail page with job_id
      router.push(`/jobs/${encodeURIComponent(item.id)}`);
    } catch (error) {
      console.error("Error navigating to job detail:", error);
      setIsNavigating(false);
    }
  }

  // Don't render if item is invalid
  if (!item || !item.id) {
    return (
      <div className="flex gap-3 border-1 rounded-xl p-2 overflow-hidden bg-red-50">
        <div className="flex flex-col justify-center items-center w-full text-center">
          <p className="text-red-600 font-semibold">Invalid Job Data</p>
          <p className="text-red-500 text-sm">
            Unable to display job information
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 border-1 rounded-xl p-2 overflow-hidden hover:shadow-md transition-shadow">
      {item.employer_logo ? (
        <img
          src={item.employer_logo}
          alt={`${item.title || "Company"} logo`}
          width={30}
          height={30}
          className="h-10 w-10 rounded-xl object-contain flex-shrink-0"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <div className="h-10 w-10 rounded-xl  flex items-center justify-center flex-shrink-0">
          <span className="text-gray-500 text-xs">No Logo</span>
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <h2 className="font-semibold text-lg truncate" title={item.title}>
          {item.title || "Untitled Job"}
        </h2>
        <p className="line-clamp-2 text-gray-600 text-sm mb-2">
          {item.description || "No description available"}
        </p>
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <p>By {item.job_publisher || item.employer_name || "Unknown"}</p>
          <p>Job Id: {item.jobId || "Unknown"}</p>
        </div>
        <div className="flex gap-2 text-xs text-gray-600 mb-3 flex-wrap">
          {item.employment_type && (
            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
              {item.employment_type}
            </span>
          )}
          {item.location && (
            <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
              {item.location}
            </span>
          )}
          {/* {(item.salary || item.job_max_salary) && (
            <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
              {item.salary && item.salary
                ? `$${item.salary}-${item.salary}`
                : item.salary
                ? `Up to $${item.salary}`
                : `From $${item.salary}`}
                {item.salary}
            </span>
          )} */}
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">
              ${item.salary}
            </span>
        </div>
        <div className="flex gap-2 mt-auto">
          <button
            className={`px-1 py-0.5 rounded w-20 transition-colors ${
              isNavigating
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-blue-400 text-white hover:bg-blue-600"
            }`}
            onClick={handleDetailClick}
            disabled={isNavigating}
          >
            {isNavigating ? "Loading..." : "Detail"}
          </button>
          <SaveJob key={item.id} item={item} />
        </div>
      </div>
    </div>
  );
}
