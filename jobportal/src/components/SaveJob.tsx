//@ts-nocheck
"use client";

import { useState } from "react";
import { useJobContext } from "../context";

export default function SaveJob({ item }) {
  const { savedJobs, saveJob, removeJob, isLoading } = useJobContext();
  const [isProcessing, setIsProcessing] = useState(false);

  // Check if job is already saved
  const isSaved = savedJobs.some((job) => job.job_id === item?.job_id);

  async function handleClick() {
    if (!item || !item.job_id) {
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
          console.log("Job saved:", item.job_title);
        } else {
          console.error("Failed to save job:", item.job_title);
        }
      } else {
        success = removeJob(item.job_id);
        if (success) {
          console.log("Job removed from saved:", item.job_title);
        } else {
          console.error("Failed to remove job:", item.job_title);
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
          className="px-4 py-2 rounded bg-gray-300 text-gray-500 cursor-not-allowed"
        >
          Loading...
        </button>
      </div>
    );
  }

  // Don't render if item is invalid
  if (!item || !item.job_id) {
    return (
      <div>
        <button
          disabled
          className="px-4 py-2 rounded bg-red-300 text-red-700 cursor-not-allowed"
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
        className={`px-4 py-2 rounded transition-colors duration-200 ${
          isProcessing
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : isSaved
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        {isProcessing
          ? "Processing..."
          : isSaved
          ? "Unsave Job"
          : "Save Job"}
      </button>
    </div>
  );
}
