//@ts-nocheck
"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import data from "../../../constraints/data";
import SaveJob from "../../../components/SaveJob";
import Detail from "@/components/Detail";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const url = `https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&job_id=${id}`;
  // const options = {
  //   method: "GET",
  //   headers: {
  //     "x-rapidapi-key": "3af7ccc427msh69b1244c7ffd6f6p14d7d0jsnb2e915cfc4d6",
  //     "x-rapidapi-host": "jsearch.p.rapidapi.com",
  //   },
  // };

  // useEffect(() => {
  //   if (id) {
  //     fetch(url,options)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setJob(data);
  //         setLoading(false);
  //         console.log("jhjsbfjh",data);
  //       })
  //       .catch(() => setLoading(false));
  //   }
  // }, [id]);
  // console.log("id ",id);

  useEffect(() => {
    try {
      if (!params?.id) {
        setError("No job ID provided");
        setLoading(false);
        return;
      }

      // Decode and clean the ID
      const id = decodeURIComponent(params.id).trim();
      console.log("Looking for job with ID:", id);

      // Find job with exact match first, then try loose matching
      let jobData = data.find((job) => job.job_id === id);

      if (!jobData) {
        // Try trimmed comparison as fallback
        jobData = data.find((job) => job.job_id?.trim() === id);
      }

      if (!jobData) {
        console.error("Job not found with ID:", id);
        console.log(
          "Available job IDs:",
          data.map((j) => j.job_id)
        );
        setError(`Job not found with ID: ${id}`);
      } else {
        console.log("Job found:", jobData.job_title);
        setJob(jobData);
      }
    } catch (err) {
      console.error("Error loading job details:", err);
      setError("Error loading job details");
    } finally {
      setLoading(false);
    }
  }, [params?.id]);

  // console.log("route", job);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
        </div>
        <p className="mt-4 text-gray-600">Loading job details...</p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <h2 className="text-xl font-bold mb-2">Job Not Found</h2>
          <p>{error || "The requested job could not be found."}</p>
        </div>
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div>
      <Detail job={job} key={job.job_id}/>
    </div>
  );
}
