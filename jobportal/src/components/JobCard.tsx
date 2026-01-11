"use client";
import { Job } from "@/lib/type";
import { InfoIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SaveJob from "./SaveJob";

export default function JobCard({ item }: { item: Job }) {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  function handleDetailClick() {
    if (!item?.id || isNavigating) return;
    setIsNavigating(true);
    router.push(`/jobs/${encodeURIComponent(item.id)}`);
  }
  if (!item || !item.id) {
    return (
      <div className="flex gap-3 border rounded-xl p-4">
        <div className="w-full text-center">
          <p className="text-red-600 dark:text-red-400 font-semibold">
            Invalid Job Data
          </p>
          <p className="text-sm text-red-500 dark:text-red-300">
            Unable to display job information.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[30vh] gap-4 border rounded-xl p-4 hover:shadow transition-shadow">
      {/* Logo */}
      {item.employer_logo ? (
        <img
          src={item.employer_logo}
          alt={`${item.job_title || "Company"} logo`}
          width={40}
          height={40}
          className="h-12 w-12 rounded-xl object-contain"
        />
      ) : (
        <div className="h-12 w-12 rounded-xl flex items-center justify-center text-xs text-gray-600 dark:text-gray-200">
          No Logo
        </div>
      )}

      {/* Info */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h2
            className="text-lg font-semibold truncate text-black dark:text-white"
            title={item.job_title ?? undefined}
          >
            {item.job_title || "Untitled Job"}
          </h2>
        </div>

        {/* Description */}
        <p className="line-clamp-2 text-sm p-1 text-gray-700 dark:text-gray-300 mb-2">
          {item.job_description || "No description available"}
        </p>

        {/* Meta Info */}
        <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
          <p>By {item.job_publisher || item.employer_name || "Unknown"}</p>
          <p>Job ID: {item.jobId || "Unknown"}</p>
        </div>

        {/* Tags */}
        <div className="flex gap-2 text-xs mb-3 flex-wrap">
          {item.employment_type && (
            <span className="px-2 py-1 border rounded text-blue-700 dark:text-blue-300">
              {item.employment_type}
            </span>
          )}
          {item.location && (
            <span className="px-2 py-1 border rounded text-green-700 dark:text-green-300">
              {item.location}
            </span>
          )}
          <span className="px-2 py-1 border rounded text-purple-700 dark:text-purple-300">
            ${item.job_salary || "Not specified"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center-safe gap-2 mt-auto">
          <div className="flex gap-2">
            <button
              className={`px-3 py-1 rounded text-sm font-medium transition-colors border ${
                isNavigating
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-400"
              }`}
              onClick={handleDetailClick}
              disabled={isNavigating}
            >
              {isNavigating ? "Loading..." : <InfoIcon size={14} />}
            </button>
            <SaveJob key={item.id} item={item} />
          </div>
          <Link
            href={"/company/" + item.company.id}
            className="text-sm text-gray-500 dark:text-gray-400 hover:cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
          >
            {item.company.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
