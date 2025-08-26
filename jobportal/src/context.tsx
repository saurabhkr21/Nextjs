"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type JobContextType = {
  savedJobs: any[];
  saveJob: (job: any) => boolean;
  removeJob: (id: string) => boolean;
  clearAllSavedJobs: () => void;
  isLoading: boolean;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export function JobProvider({ children }: { children: React.ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedJobs = localStorage.getItem("savedJobs");
      if (storedJobs) {
        const parsedJobs = JSON.parse(storedJobs);
        setSavedJobs(Array.isArray(parsedJobs) ? parsedJobs : []);
      }
    } catch {
      setSavedJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      } catch {}
    }
  }, [savedJobs, isLoading]);

  const saveJob = (job: any) => {
    if (!job || !job.id) return false;
    if (savedJobs.find((j) => j.id === job.id)) return false;
    setSavedJobs((prevJobs) => [...prevJobs, job]);
    return true;
  };

  const removeJob = (id: string) => {
    if (!id) return false;
    setSavedJobs((prevJobs) => prevJobs.filter((j) => j.id !== id));
    return true;
  };

  const clearAllSavedJobs = () => {
    setSavedJobs([]);
    localStorage.removeItem("savedJobs");
  };

  return (
    <JobContext.Provider
      value={{
        savedJobs,
        saveJob,
        removeJob,
        clearAllSavedJobs,
        isLoading,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

export function useJobContext() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
}
