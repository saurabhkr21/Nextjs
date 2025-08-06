//@ts-nocheck
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create context
const JobContext = createContext();

// Context provider component
export function JobProvider({ children }) {
  const[name,setName]=useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page,setPage]=useState(1);
  const  [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }
  function handleIncrement(){
    setPage(page+1);
  }
  function handleDecrement(){
    if(page >=1){
      setPage(page-1);
    }
  }

  // Load saved jobs from localStorage on component mount
  useEffect(() => {
    try {
      const storedJobs = localStorage.getItem('savedJobs');
      if (storedJobs) {
        const parsedJobs = JSON.parse(storedJobs);
        setSavedJobs(Array.isArray(parsedJobs) ? parsedJobs : []);
      }
    } catch (error) {
      console.error('Error loading saved jobs from localStorage:', error);
      setSavedJobs([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save to localStorage whenever savedJobs changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      } catch (error) {
        console.error('Error saving jobs to localStorage:', error);
      }
    }
  }, [savedJobs, isLoading]);

  // Save a job
  const saveJob = (job) => {
    try {
      if (!job || !job.id) {
        console.error('Invalid job data provided to saveJob');
        return false;
      }

      const jobExists = savedJobs.find((j) => j.id === job.id);
      if (jobExists) {
        console.log('Job already saved:', job.title);
        return false;
      }

      setSavedJobs(prevJobs => [...prevJobs, job]);
      console.log('Job saved successfully:', job.title);
      return true;
    } catch (error) {
      console.error('Error saving job:', error);
      return false;
    }
  };

  // Remove a job
  const removeJob = (id) => {
    try {
      if (!id) {
        console.error('Invalid job_id provided to removeJob');
        return false;
      }

      const jobExists = savedJobs.find((j) => j.id === id);
      if (!jobExists) {
        console.log('Job not found in saved jobs:', id);
        return false;
      }

      setSavedJobs(prevJobs => prevJobs.filter((j) => j.id !== id));
      console.log('Job removed successfully:', id);
      return true;
    } catch (error) {
      console.error('Error removing job:', error);
      return false;
    }
  };

  // Set selected job for detail view
  const selectJob = (job) => {
    try {
      setSelectedJob(job);
      console.log('Job selected:', job?.title || 'None');
    } catch (error) {
      console.error('Error selecting job:', error);
    }
  };

  // Clear all saved jobs
  const clearAllSavedJobs = () => {
    try {
      setSavedJobs([]);
      localStorage.removeItem('savedJobs');
      console.log('All saved jobs cleared');
    } catch (error) {
      console.error('Error clearing saved jobs:', error);
    }
  };

  return (
    <JobContext.Provider
      value={{
        open,
        handleOpen,
        handleClose,
        setOpen,
        page,
        setPage,
        handleDecrement,
        handleIncrement,
        name,
        setName,
        savedJobs,
        saveJob,
        removeJob,
        selectedJob,
        selectJob,
        setSavedJobs,
        setSelectedJob,
        clearAllSavedJobs,
        isLoading,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}

// Custom hook for easy access
export function useJobContext() {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
}

