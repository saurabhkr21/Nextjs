//@ts-nocheck
"use client";

import { useState } from "react";
import { useJobContext } from "../context";
import { title } from "process";
import { BookCheck, Bookmark, Loader } from "lucide-react";

export default function SaveJob({ item }) {
  const { savedJobs, saveJob, removeJob, isLoading } = useJobContext();
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if job is already saved
  const isSaved = savedJobs.some((job) => job.id === item?.id);

  async function handleClick() {
    if (!item || !item.id) {
      console.error("Invalid job item provided to SaveJob component");
      return;
    }

    if (isProcessing) {
      console.log("Save operation already in progress");
      return;
    }

    setIsProcessing(true);

    try {
      let success = false;

      if (!isSaved) {
        success = saveJob(item);
        if (success) {
          console.log("Job saved:", item.title);
        } else {
          console.error("Failed to save job:", item.title);
        }
      } else {
        success = removeJob(item.id);
        if (success) {
          console.log("Job removed from saved:", item.title);
        } else {
          console.error("Failed to remove job:", item.title);
        }
      }
    } catch (error) {
      console.error("Error in handleClick:", error);
    } finally {
      setIsProcessing(false);
    }
  }

  // Don't render if context is still loading
  if (isLoading) {
    return (
      <div>
        <button
          disabled
          className="px-1 py-0.5 rounded bg-gray-300 text-gray-500 cursor-not-allowed"
        >
          <Loader />
        </button>
      </div>
    );
  }

  // Don't render if item is invalid
  if (!item || !item.id) {
    return (
      <div>
        <button
          disabled
          className="px-1 py-0.5 rounded bg-red-300 text-red-700 cursor-not-allowed"
        >
          Invalid Job
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={isProcessing}
        className={`px-4 py-2 rounded transition-colors hover:bg-slate-600 bg-zinc-200 dark:bg-zinc-700 duration-200 ${
          isProcessing
            ? "hover:bg-zinc-300 text-gray-500 dark:hover:bg-zinc-400 cursor-not-allowed"
            : isSaved
            ? "text-zinc-700  hover:bg-zinc-300"
            : "bg-slate-400 text-white dark:bg-zinc-700"
        }`}
      >
        {isProcessing ? "Processing..." : isSaved ? <Bookmark className="text-blue-400 rounded shadow-amber-400" size={18} /> : <Bookmark size={16} />}
      </button>
    </div>
  );
}
