//@ts-nocheck
"use client";

import { useState } from "react";
import { useJobContext } from "../context";
import { title } from "process";

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
          Loading...
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
        className={`px-1 py-0.5 rounded transition-colors duration-200 ${
          isProcessing
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : isSaved
            ? "bg-red-300 text-white hover:bg-red-400"
            : "bg-blue-400 text-white hover:bg-blue-500"
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